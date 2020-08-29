const express = require('express')
const router = express.Router()
const products = []

router.get('/add-product', (req, res) => {
  res.render('add-product', {
    pageTitle: 'Add Products',
    path: req.url,
    css: [
      { url: '/css/forms.css' }
    ]
  })
})

router.post('/add-product', (req, res) => {
  products.push({ title: req.body.title })
  res.redirect('/')
})

module.exports = {
  products,
  routes: router
}
