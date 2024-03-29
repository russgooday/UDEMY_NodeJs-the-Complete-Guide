// const path = require('path')

const express = require('express')

const shopController = require('../controllers/shop')

const router = express.Router()

router.get('/', shopController.getIndex)

router.get('/products', shopController.getProducts)

// :productId assigns to productId a dynamic property e.g. /products/uniqueIdCodeHere
router.get('/products/:productId', shopController.getProduct)

router.get('/cart', shopController.getCart)

router.post('/cart', shopController.postCart)

router.post('/cart-remove-item', shopController.postRemoveItem)

router.get('/orders', shopController.getOrders)

router.get('/checkout', shopController.getCheckout)

module.exports = router
