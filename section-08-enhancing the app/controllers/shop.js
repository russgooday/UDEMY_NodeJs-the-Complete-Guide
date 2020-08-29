const Product = require('../models/product')

const getIndex = (req, res) => {
  Product.fetchAll(
    products => {
      res.render('shop/index', {
        products,
        pageTitle: 'Home',
        path: req.originalUrl,
        css: [
          { url: '/css/product.css' }
        ]
      })
    }
  )
}

const getProducts = (req, res) => {
  Product.fetchAll(
    products => {
      res.render('shop/product-list', {
        products,
        pageTitle: 'Shop',
        path: req.originalUrl,
        css: [
          { url: '/css/product.css' }
        ]
      })
    }
  )
}

const getCart = (req, res) => {
  res.render('shop/cart', {
    pageTitle: 'Shopping Cart',
    path: req.originalUrl,
    css: [
      { url: '/css/product.css' }
    ]
  })
}

const getOrders = (req, res) => {
  res.render('shop/orders', {
    pageTitle: 'Orders',
    path: req.originalUrl,
    css: [
      { url: '/css/product.css' }
    ]
  })
}

const getCheckout = (req, res) => {
  res.render('shop/checkout', {
    pageTitle: 'Checkout',
    path: req.originalUrl,
    css: [
      { url: '/css/product.css' }
    ]
  })
}

module.exports = {
  getProducts,
  getIndex,
  getCart,
  getOrders,
  getCheckout
}
