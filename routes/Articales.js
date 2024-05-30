const express = require('express')
const router = express.Router()
const Articales = require("../models/Articales");
const fs = require('fs');
const path = require('path');

const multer = require("multer");
const CategoryMarket = require('../models/CategoryMarket');
const OffersMarket = require('../models/OffersMarket');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, "./files")
    },
    filename: function (req, file, cb) {
        return cb(null, `${Date.now()}_${file.originalname}`)
    }
})

const Uplode = multer({ storage: storage })

router.post('/CreateArticales', Uplode.array('file', 3), async (req, res) => {
    const file = req.files
    const { title, name, information, price, number, category } = req.body

    try {
        const fileNames = file.map(file => file.filename);
        await Articales.create({ title: title, name: name, information: information, price: price, number: number, category: category, file: fileNames })
        res.json({ status: "asd" })
    } catch (error) {
        res.json({ status: error })
        console.log('err')
    }
});

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

router.post('/CreateCategoryMarket', Uplode.array('file', 3), async (req, res) => {
    const file = req.files
    const { name } = req.body
    try {
        const fileNames = file.map(file => file.filename);
        await CategoryMarket.create({ name: name, file: fileNames })
        res.json({ status: "asd" })
    } catch (error) {
        res.json({ status: error })
        console.log('err')
    }
});

router.post('/CreateAnOffer', Uplode.array('file', 3), async (req, res) => {
    const file = req.files
    try {
        const fileNames = file.map(file => file.filename);
        await OffersMarket.create({ file: fileNames })
        res.json({ status: "asd" })
    } catch (error) {
        res.json({ status: error })
        console.log('err')
    }
});

router.get("/GetAnOffer", (req, res, next) => {
    OffersMarket.find()
        .then((doc) => res.status(200).json(doc))
        .catch((err) => res.status(400).json(err))
})


router.get("/GetCategoryMarket", (req, res, next) => {
    CategoryMarket.find()
        .then((doc) => res.status(200).json(doc))
        .catch((err) => res.status(400).json(err))
})

router.delete("/DeleteCategoryMarket/:id", (req, res) => {
    const id = req.params.id;
    CategoryMarket.findById(id)
        .then((doc) => {

            const fileToDelete = doc.file;
            let deletedFiles = 0;

            fileToDelete.forEach((filename) => {
                const filePath = path.join(__dirname, '../files', filename);


                fs.unlink(filePath, (err) => {
                    if (err) {
                        console.error("حدث خطأ أثناء حذف الملف", err);
                        return res.status(500).json({ error: "خطأ في حذف الملف" });
                    }

                    deletedFiles++;
                    if (deletedFiles === fileToDelete.length) {
                        CategoryMarket.findByIdAndDelete(id)
                            .then(() => {
                                res.status(200).json({ message: "تم حذف العنصر والملفات بنجاح" });
                            })
                            .catch((err) => {
                                console.error("خطأ في حذف العنصر", err);
                                res.status(400).json({ error: "خطأ في حذف العنصر", err });
                            });
                    }
                });
            });
        })
        .catch((err) => {
            console.error("خطأ في البحث عن العنصر");
            res.status(400).json({ error: "خطأ في البحث عن العنصر", err });
        });
});

router.get("/GetArticalecategory/:category", (req, res) => {
    Articales.find({ category: req.params.category })
        .then((doc) => res.status(200).json(doc))
        .catch((err) => res.status(400).json(err))
})

router.patch("/PatchArticale/:id", Uplode.array('file', 3), async (req, res) => {
    const id = req.params.id;
    const file = req.files
    const { name, title, information, price, number } = req.body;
    Articales.findById(id)
        .then(async (doc) => {
            const fileToDelete = doc.file;
            let deletedFiles = 0;

            if (fileToDelete.length > 0) {
                fileToDelete.forEach((filename) => {
                    const filePath = path.join(__dirname, '../files', filename);

                    fs.unlink(filePath, async (err) => {
                        if (err) {
                            console.error("حدث خطأ أثناء حذف الملف", err);
                            return res.status(500).json({ error: "خطأ في حذف الملف" });
                        }

                        deletedFiles++;
                        if (deletedFiles === fileToDelete.length) {

                            const fileNames = file.map(file => file.filename);
                            await Articales.findByIdAndUpdate(req.params.id, { title: title, name: name, information: information, price: price, number: number, file: fileNames })
                            res.json({ status: "asd" })
                        }
                    });
                });
            } else {

                const fileNames = file.map(file => file.filename);
                await Articales.findByIdAndUpdate(req.params.id, { title: title, name: name, information: information, price: price, number: number, file: fileNames })
                res.json({ status: "asd" })
            }
        })
        .catch((err) => {
            console.error("خطأ في البحث عن العنصر", err);
            res.status(400).json({ error: "خطأ في البحث عن العنصر", err });
        });
})



router.delete("/DeleteArticale/:id", (req, res) => {
    const id = req.params.id;
    Articales.findById(id)
        .then((doc) => {

            const fileToDelete = doc.file;
            let deletedFiles = 0;
            if (fileToDelete.length > 0) {
                fileToDelete.forEach((filename) => {
                    const filePath = path.join(__dirname, '../files', filename);

                    fs.unlink(filePath, (err) => {
                        if (err) {
                            console.error("حدث خطأ أثناء حذف الملف", err);
                            return res.status(500).json({ error: "خطأ في حذف الملف" });
                        }

                        deletedFiles++;
                        if (deletedFiles === fileToDelete.length) {
                            Articales.findByIdAndDelete(id)
                                .then(() => {
                                    res.status(200).json({ message: "تم حذف العنصر والملفات بنجاح" });
                                })
                                .catch((err) => {
                                    console.error("خطأ في حذف العنصر", err);
                                    res.status(400).json({ error: "خطأ في حذف العنصر", err });
                                });
                        }
                    });
                });
            } else {
                Articales.findByIdAndDelete(id)
                    .then(() => {
                        res.status(200).json({ message: "تم حذف العنصر والملفات بنجاح" });
                    })
                    .catch((err) => {
                        console.error("خطأ في حذف العنصر", err);
                        res.status(400).json({ error: "خطأ في حذف العنصر", err });
                    });
            }

        })
        .catch((err) => {
            console.error("خطأ في البحث عن العنصر", err);
            res.status(400).json({ error: "خطأ في البحث عن العنصر", err });
        });
});







module.exports = router