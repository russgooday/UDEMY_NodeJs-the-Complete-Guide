const Products = require('../models/product')
const { formatCurrency } = require('../models/helpers/general')

exports.getAddProduct = (req, res) => {
  res.render('admin/edit-product', {
    product: {},
    pageTitle: 'Add Product',
    buttonTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  })
}

exports.getEditProduct = async (req, res) => {
  const id = req.params.productId
  const [[product]] = await Products.fetchById(id)
  const editMode = req.query.edit

  res.render('admin/edit-product', {
    product,
    pageTitle: 'Edit Product',
    buttonTitle: 'Update Product',
    path: '/admin/edit-product',
    editing: editMode === 'true'
  })
}

exports.postAddProduct = async (req, res) => {
  const product = Products.createProduct(req.body)

  await Products.add(product)
  res.redirect('/admin/products')
}

exports.postEditProduct = async (req, res) => {
  const { id, ...props } = req.body
  const product = Products.createProduct(props)

  await Products.update(id, product)
  res.redirect('/admin/products')
}

exports.postDeleteProduct = async (req, res) => {
  const id = req.body['product-id']

  await Products.delete(id)
  res.redirect('/admin/products')
}

exports.getProducts = async (req, res, next) => {
  const [products] = await Products.fetchAll()

  res.render('admin/products', {
    formatCurrency,
    prods: products,
    pageTitle: 'Admin Products',
    path: '/admin/products'
  })
}
