const path = require('path')
const productsPath = path.join(`${process.mainModule.path}/data/products.json`)
const product = require('../models/product')

exports.getAddProduct = (req, res, next) => {
  res.render('add-product', {
    pageTitle: 'Add Products',
    path: req.url,
    css: [
      { url: '/css/forms.css' }
    ]
  })
}

exports.postAddProduct = (req, res, next) => {
  product.saveProductsToFile(
    productsPath,
    products => {
      products.push(product.createProduct(req.body.title))
      return products
    }
  )
  res.redirect('/')
}

exports.getProducts = (req, res) => {
  product.getProductsFromFile(
    productsPath,
    products => {
      res.render('shop', {
        products,
        pageTitle: 'Shop',
        path: req.url,
        css: [
          { url: '/css/product.css' }
        ]
      })
    }
  )
}
