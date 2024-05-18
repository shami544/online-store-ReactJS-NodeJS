const express = require('express')
const router = express.Router()
const Articales = require("../../models/Articales")
const CategoryMarket = require("../../models/CategoryMarket")
const OffersMarket = require('../../models/OffersMarket')


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


module.exports = router
