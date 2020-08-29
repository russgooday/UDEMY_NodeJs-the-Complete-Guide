const express = require('express')
const adminData = require('./admin')
const router = express.Router()

router.get('/', (req, res) => {
  res.render('shop', {
    products: adminData.products,
    pageTitle: 'Shop',
    path: req.url,
    css: [
      { url: '/css/product.css' }
    ]
  })
})

module.exports = router
