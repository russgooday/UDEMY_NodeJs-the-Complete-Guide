const Product = require('../models/product')
const { formatCurrency, removeEmptyProps } = require('../models/helpers/general')

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
  const user = req.user
  const editMode = req.query.edit

  try {
    const [product] = await user.getProducts({ where: { id } })

    res.render('admin/edit-product', {
      product,
      pageTitle: 'Edit Product',
      buttonTitle: 'Update Product',
      path: '/admin/edit-product',
      editing: editMode === 'true'
    })
  } catch (err) {
    console.error(err)
  }
}

exports.postAddProduct = async (req, res) => {
  const { user, body } = req
  const props = removeEmptyProps(body)

  try {
    await user.createProduct(props)
    res.redirect('/admin/products')
  } catch (err) {
    console.error(err)
  }
}

exports.postEditProduct = async (req, res) => {
  const { id, ...props } = req.body

  try {
    await Product.update(
      removeEmptyProps(props),
      {
        where: { id }
      }
    )
    res.redirect('/admin/products')
  } catch (err) {
    console.error(err)
  }
}

exports.postDeleteProduct = async (req, res) => {
  const id = req.body.id

  try {
    await Product.destroy({ where: { id } })
    res.redirect('/admin/products')
  } catch (err) {
    console.error(err)
  }
}

exports.getProducts = async (req, res, next) => {
  const user = req.user

  try {
    const products = await user.getProducts()

    res.render('admin/products', {
      formatCurrency,
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    })
  } catch (err) {
    console.error(err)
  }
}
