const express = require('express')
const { createProduct, getAllProducts, getProductById, deleteProduct, updateProduct } = require('../controllers/productController')
const router = express.Router()


router.post("/product/new", createProduct)
router.get("/product/getAll",getAllProducts)
router.get("/product/getone/:id", getProductById)
router.delete("/product/delete/:id",deleteProduct)
router.put("/product/update/:id",updateProduct)


module.exports = router