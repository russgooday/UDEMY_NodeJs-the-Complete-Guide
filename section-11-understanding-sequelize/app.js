const path = require('path')
const port = process.env.PORT || 8080
const express = require('express')
const bodyParser = require('body-parser')
const errorController = require('./controllers/error')
const connect = require('./util/connect')
const initialiseUser = require('./util/initialiseUser')
const httpContext = require('express-http-context')
const app = express()

app.set('view engine', 'ejs')
app.set('views', 'views')

const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(httpContext.middleware)
app.use(initialiseUser)
app.use('/admin', adminRoutes)
app.use(shopRoutes)
app.use(errorController.get404)

connect(/* force */)
  .then(() => app.listen(port))
