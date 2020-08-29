const
  path = require('path')
const express = require('express')
const ejs = require('ejs')
const app = express()
const adminData = require('./routes/admin')
const shopRoutes = require('./routes/shop')
const port = 3000

/*
    NPM ejs - Templating alternative for HTML files
    # app.set('view engine', 'ejs');
*/
app.set('view engine', 'ejs')

// (body-parser) parses request bodies in middleware to req.body
app.use(express.urlencoded({ extended: false }))
// static links for css, images etc
app.use(express.static(path.join(__dirname, '/public')))

app.use('/admin', adminData.routes)
app.use(shopRoutes)

app.use((req, res, next) => {
  res.status(404).render('error-404', {
    pageTitle: 'Page Not Found!!'
  })
})

app.listen(port)
