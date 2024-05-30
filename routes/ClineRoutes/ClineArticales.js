const express = require('express')
const router = express.Router()
const Articales = require("../../models/Articales")
const CategoryMarket = require("../../models/CategoryMarket")
const OffersMarket = require('../../models/OffersMarket')
const Users = require('../../models/Users')
const Order = require('../../models/Order')
const { format } = require('date-fns')


router.get("/GetArticales", (req, res, next) => {
    Articales.find()
        .then((doc) => res.status(200).json(doc))
        .catch((err) => res.status(400).json(err))
})

router.get("/GetArticale/:id", (req, res) => {
    Articales.findById(req.params.id)
        .then((doc) => res.status(200).json(doc))
        .catch((err) => res.status(400).json(err))
})

router.get("/GetCategoryMarket", (req, res, next) => {
    CategoryMarket.find()
        .then((doc) => res.status(200).json(doc))
        .catch((err) => res.status(400).json(err))
})

router.get("/GetArticalecategory/:category", (req, res) => {
    Articales.find({ category: req.params.category })
        .then((doc) => res.status(200).json(doc))
        .catch((err) => res.status(400).json(err))
})

router.get("/GetAnOffer", (req, res, next) => {
    OffersMarket.find()
        .then((doc) => res.status(200).json(doc))
        .catch((err) => res.status(400).json(err))
})

router.post("/SearchProduct", async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) - 1 || 0;
        const limit = parseInt(req.query.limit) || 5;
        const saerch = req.body.saerch || "";
        const category = req.body.category || "";
        const priceCategory = req.body.priceCategory || ''
        if (priceCategory == "0-199") {
            nm1 = 0, nm2 = 199
        } else if (priceCategory == "200-499") {
            nm1 = 200, nm2 = 499
        } else if (priceCategory == "500-999") {
            nm1 = 500, nm2 = 999
        } else if (priceCategory == "1000") {
            nm1 = 1000, nm2 = 100000000000
        } else { nm1 = 0, nm2 = 1000000 }

        const movies = await Articales.find({
            "$and": [
                {
                    "$or": [
                        { name: { $regex: saerch, $options: "i" } },
                        { title: { $regex: saerch, $options: "i" } },
                    ]
                },
                { category: category },
                { price: { $gte: nm1, $lt: nm2 } }
            ]
        });

        // .where("name")
        // .skip(page * limit)
        // .limit(limit);

        const total = await Articales.countDocuments({
            "$or": [
                { name: { $regex: saerch, $options: "i" } },
                { title: { $regex: saerch, $options: "i" } },
            ]
        } && { category: category });

        const response = {
            error: false,
            total,
            page: page + 1,
            limit,
            movies,
        };

        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: true, message: "Internal Server Error" });
    }
})

router.post("/CreateOrder", async (req, res) => {
    const userId = req.body.userId
    const cartItems = req.body.cartItems
    const user = await Users.findById(userId)
    const payment = req.body.payment
    const receipt = req.body.receipt
    const totalPrice = req.body.totalPrice
    const UserDetails = { id: user._id, name: user.user, phone: user.phone }
    const dateNow = Date.now()
    const DateOrder = format(dateNow, 'dd/MM/yyyy HH:mm')

    try {
        const receiptAddress = await user.address.find(addr => addr._id.toString() === req.body.receiptAddress);
        const cart = await Promise.all(cartItems.map(async (item) => {
            const articale = await Articales.findById(item.id);
            return { ...articale.toObject(), quantity: item.quantity };
        }));
        const doc = await Order.create({ cart, receiptAddress, receipt, payment, totalPrice, UserDetails, DateOrder })
        res.status(200).json(doc)
    } catch (error) {
        res.status(404).json({ error: true, message: "Internal Server Error" })
    }
})

router.get("/GetOrder/:id", async (req, res) => {
    await Order.findById(req.params.id)
        .then((doc) => res.status(200).json(doc))
        .catch((err) => res.status(404).json(err))
})

router.get("/GetOrders/:UserId", async (req, res) => {
    await Order.find({ "UserDetails.id": req.params.UserId })
        .then((doc) => res.status(200).json(doc))
        .catch((err) => res.status(404).json(err))
}) 

module.exports = router
