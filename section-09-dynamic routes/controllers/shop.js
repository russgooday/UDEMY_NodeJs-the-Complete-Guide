const Products = require('../models/product')
const Cart = require('../models/cart')

exports.getProducts = async (req, res, next) => {
  const products = await Products.fetchAll()

  res.render('shop/product-list', {
    prods: products,
    pageTitle: 'All Products',
    path: '/products'
  })
}

// expects an unformatted string and returns with paragraphs
// e.g. 'text\n\r\n\r' returns '<p>text</p>'
const formatParagraphs = (text) => (
  text.replaceAll(/([^\n\r]+)(?:[\n\r]+)?/gm, '<p>$1</p>\n')
)

exports.getProduct = async (req, res, next) => {
  const { productId } = req.params
  const product = await Products.fetchById(productId)
  const description = formatParagraphs(product.description)

  res.render('shop/product-detail', {
    product: { ...product, description },
    pageTitle: product?.title ?? 'Product Not Found',
    path: '/products'
  })
}

exports.getIndex = async (req, res, next) => {
  const products = await Products.fetchAll()

  res.render('shop/index', {
    prods: products,
    pageTitle: 'Shop',
    path: '/'
  })
}

exports.getCart = async (req, res, next) => {
  const cart = await Cart.fetch()
  console.log(cart)

  res.render('shop/cart', {
    path: '/cart',
    pageTitle: 'Your Cart'
  })
}

exports.postCart = (req, res, next) => {
  Cart.add(req.body)
  res.redirect('/cart')
}

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  })
}

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  })
}
