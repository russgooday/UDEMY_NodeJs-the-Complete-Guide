const path = require('path')
const express = require('express')
const ejs = require('ejs')
const app = express()
const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')
const errControl = require('./controllers/error')
const port = 3000

app.set('view engine', 'ejs')

// (body-parser) parses request bodies in middleware to req.body
app.use(express.urlencoded({ extended: false }))
// static links for css, images etc
app.use(express.static(path.join(__dirname, '/public')))

app.use('/admin', adminRoutes)
app.use(shopRoutes)
app.use(errControl.get404)

app.listen(port)
