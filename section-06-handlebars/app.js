const
  path = require('path')
const express = require('express')
const expressHBS = require('express-handlebars')
const hbsConfig = require('./views/helpers/handlebars')

const app = express()
const handlebars = expressHBS.create(hbsConfig)
const adminData = require('./routes/admin')
const shopRoutes = require('./routes/shop')
const port = 3000

app.engine('hbs', handlebars.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

// (body-parser) parses request bodies in middleware to req.body
app.use(express.urlencoded({ extended: false }))
// static links for css, images etc
app.use(express.static(path.join(__dirname, '/public')))

app.use('/admin', adminData.routes)
app.use(shopRoutes)

app.use((req, res, next) => {
  res.status(404).render('error-404', { pageTitle: 'Page Not Found' })
})

app.listen(port)
