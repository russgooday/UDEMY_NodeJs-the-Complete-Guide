const
  path = require('path')
const express = require('express')
const router = express.Router()
const adminData = require('./admin')
const basedir = process.mainModule.path

/* Will be picked up on our baseurl eg. homepage */
router.get('/', (req, res) => {
  const products = adminData.products
  res.render('shop', {
    products,
    pageTitle: 'Shop',
    path: req.url
  })
})

module.exports = router
