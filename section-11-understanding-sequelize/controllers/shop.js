const userRespository = require('../models/repository/user-repository')
const cartRespository = require('../models/repository/cart-repository')
const orderRespository = require('../models/repository/order-repository')

const getCartDisplayFields = require('../models/helpers/cart')
const getOrderDisplayFields = require('../models/helpers/orders')
const { formatCurrency, formatParagraphs } = require('../views/helpers/general')

exports.getProducts = async (req, res, next) => {
  const products = await userRespository.getProducts()

  res.render('shop/product-list', {
    formatCurrency,
    prods: products,
    pageTitle: 'All Products',
    path: '/products'
  })
}

exports.getProduct = async (req, res, next) => {
  const product = await userRespository.getProduct(req.params.id)

  res.render('shop/product-detail', {
    product,
    formatCurrency,
    formatParagraphs,
    pageTitle: product?.title || 'Product Not Found',
    path: '/products'
  })
}

exports.getIndex = async (req, res, next) => {
  const products = await userRespository.getProducts()

  res.render('shop/index', {
    formatCurrency,
    prods: products,
    pageTitle: 'Shop',
    path: '/'
  })
}

/* --- Cart Methods --- */

exports.getCart = async (req, res, next) => {
  const user = req.user
  const { products } = await userRespository.getCart(user)
  const { items, totalPrice } = getCartDisplayFields(products)

  res.render('shop/cart', {
    items,
    totalPrice,
    formatCurrency,
    pageTitle: `${user.name}'s Cart`,
    path: '/cart'
  })
}

exports.postAddToCart = async (req, res, next) => {
  await cartRespository.addProduct(req.body.id)
  res.redirect('/cart')
}

exports.postRemoveItem = async (req, res, next) => {
  await cartRespository.removeProduct(req.body.id)
  res.redirect('/cart')
}

/* --- Order Methods --- */

exports.postOrder = async (req, res, next) => {
  await orderRespository.addOrders()
  res.redirect('/orders')
}

exports.getOrders = async (req, res, next) => {
  const user = req.user
  const { orders, totalPrice } = getOrderDisplayFields(
    await orderRespository.getOrders()
  )

  res.render('shop/orders', {
    orders,
    totalPrice,
    formatCurrency,
    path: '/orders',
    pageTitle: `${user.name}'s Orders`
  })
}

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  })
}
