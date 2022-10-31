const express = require('express')

const shopController = require('../controllers/shop')

const router = express.Router()

router.get('/', shopController.getIndex)

router.get('/products', shopController.getProducts)

// :id assigns to id a dynamic property e.g. /products/uniqueIdCodeHere
router.get('/products/:id', shopController.getProduct)

router.get('/cart', shopController.getCart)

router.post('/cart', shopController.postAddToCart)

router.post('/cart-remove-item', shopController.postRemoveItem)

router.post('/create-order', shopController.postOrder)

router.get('/orders', shopController.getOrders)

router.get('/checkout', shopController.getCheckout)

module.exports = router
