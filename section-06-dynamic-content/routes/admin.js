const express = require('express')
const router = express.Router()
const products = []

/*
    Note: in app.js we have set a base path of /admin/
    so this will be admin/add-product
*/
router.get('/add-product', (req, res) => {
  res.render('add-product', {
    pageTitle: 'Add Product',
    path: req.url
  })
})

/*
    and this will be admin/add-product
*/
router.post('/add-product', (req, res) => {
  products.push({ title: req.body.title })
  res.redirect('/')
})

module.exports = {
  products,
  routes: router
}
