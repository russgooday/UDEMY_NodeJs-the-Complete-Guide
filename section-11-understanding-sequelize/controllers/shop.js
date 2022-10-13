const Products = require('../models/product')
const Cart = require('../models/cart')
const { propEquals } = require('../models/helpers/accessors')
const { formatCurrency, formatParagraphs } = require('../models/helpers/general')

exports.getProducts = async (req, res, next) => {
  const [products] = await Products.fetchAll()

  res.render('shop/product-list', {
    formatCurrency,
    prods: products,
    pageTitle: 'All Products',
    path: '/products'
  })
}

exports.getProduct = async (req, res, next) => {
  const [[product]] = await Products.fetchById(req.params.productId)

  res.render('shop/product-detail', {
    product,
    formatCurrency,
    formatParagraphs,
    pageTitle: product?.title ?? 'Product Not Found',
    path: '/products'
  })
}

exports.getIndex = async (req, res, next) => {
  const [products] = await Products.fetchAll()

  res.render('shop/index', {
    formatCurrency,
    prods: products,
    pageTitle: 'Shop',
    path: '/'
  })
}

exports.getCart = async (req, res, next) => {
  const products = await Products.fetchAll()
  const cart = await Cart.fetchAll()
  const cartItems = cart.items.flatMap(({ id, quantity, subTotal }) => {
    const product = products.find(propEquals('id', id))

    if (!product) return []

    return {
      id,
      quantity,
      subTotal,
      title: product.title,
      author: product.author,
      price: product.price,
      image: product.image
    }
  })

  res.render('shop/cart', {
    formatCurrency,
    path: '/cart',
    pageTitle: 'Your Cart',
    items: cartItems,
    totalPrice: cart.totalPrice
  })
}

exports.postCart = async (req, res, next) => {
  const product = await Products.fetchById(req.body.id)

  Cart.add(product.id, product.price)
  res.redirect('/cart')
}

exports.postRemoveItem = (req, res, next) => {
  const id = req.body.id

  Cart.remove(id)
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
