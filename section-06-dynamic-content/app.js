/* set __basedir to root directory */
global.__basedir = __dirname

const
  path = require('path')
const express = require('express')
const app = express()
const adminData = require('./routes/admin')
const shopRoutes = require('./routes/shop')

/*
    NPM ejs - Templating alternative for HTML files
    # app.set('view engine', 'ejs');
*/
app.set('view engine', 'pug')
/*
    NPM body-parser, currently included in Express
    parses request bodies in middleware to req.body
*/
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, '/public')))

/* here we are setting a base path for adminData eg. /admin/add-product */
app.use('/admin', adminData.routes)
app.use(shopRoutes)

/* console.dir(module, { depth: 4 }) */

/* If we end up here a specific page has not been found */
app.use((req, res, next) => {
  res.status(404).render('error-404', { pageTitle: 'Error 404' })
})

app.listen(3000)
