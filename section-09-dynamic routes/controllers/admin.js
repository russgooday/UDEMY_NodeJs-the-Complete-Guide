const Products = require('../models/product')

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    product: {},
    pageTitle: 'Add Product',
    buttonTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  })
}

exports.getEditProduct = async (req, res, next) => {
  const { productId } = req.params
  const product = await Products.fetchById(productId)
  const editMode = req.query.edit

  res.render('admin/edit-product', {
    product,
    pageTitle: 'Edit Product',
    buttonTitle: 'Update Product',
    path: '/admin/edit-product',
    editing: editMode === 'true'
  })
}

exports.postAddProduct = (req, res, next) => {
  const product = Products.create(req.body)

  Products.add(product)
  res.redirect('/')
}

exports.postEditProduct = (req, res, next) => {
  const product = Products.create(req.body)

  Products.update(product)
  res.redirect('/')
}

exports.postDeleteProduct = (req, res, next) => {
  const productId = req.body['product-id']

  Products.delete(productId)
  res.redirect('/')
}

exports.getProducts = async (req, res, next) => {
  const products = await Products.fetchAll()

  res.render('admin/products', {
    prods: products,
    pageTitle: 'Admin Products',
    path: '/admin/products'
  })
}
