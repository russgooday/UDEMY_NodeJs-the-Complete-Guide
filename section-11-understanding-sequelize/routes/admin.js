const express = require('express')

const adminController = require('../controllers/admin')

const router = express.Router()

// /admin/add-product => GET
router.get('/add-product', adminController.getAddProduct)

// /admin/edit-product => GET
router.get('/edit-product/:id?', adminController.getEditProduct)

// /admin/products => GET
router.get('/products', adminController.getProducts)

// /admin/add-product => POST
router.post('/add-product', adminController.postAddProduct)

// /admin/add-product => POST
router.post('/edit-product', adminController.postEditProduct)

// /admin/add-product => POST
router.post('/delete-product', adminController.postDeleteProduct)

module.exports = router
