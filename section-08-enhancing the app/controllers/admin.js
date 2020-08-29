const Product = require('../models/product')

const getAddProduct = (req, res, next) => {
  res.render('admin/add-product', {
    pageTitle: 'Add Products',
    path: req.originalUrl,
    css: [
      { url: '/css/forms.css' }
    ]
  })
}

const postEditProduct = (req, res, next) => {
  Product.fetch(
    req.body.edit, // purely testing, this is the book title
    product => {
      res.render('admin/edit-product', {
        product,
        pageTitle: 'Edit Product',
        path: req.originalUrl,
        css: [
          { url: '/css/forms.css' }
        ]
      })
    }
  )
}

const postAddProduct = (req, res, next) => {
  const product = new Product(req.body)
  product.saveProductsToFile()
  res.redirect('/')
}

const postDeleteProduct = (req, res, next) => {
  console.dir(req.body)
  res.redirect('/')
}

const getProducts = (req, res, next) => {
  Product.fetchAll(
    products => {
      res.render('admin/products', {
        products,
        pageTitle: 'Admin Products',
        path: req.originalUrl,
        css: [
          { url: '/css/product.css' }
        ]
      })
    }
  )
}

module.exports = {
  getAddProduct,
  postEditProduct,
  postAddProduct,
  postDeleteProduct,
  getProducts
}
