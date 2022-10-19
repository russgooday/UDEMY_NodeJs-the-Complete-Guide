const path = require('path')

const express = require('express')
const bodyParser = require('body-parser')
const errorController = require('./controllers/error')
const connect = require('./util/connect')

const app = express()

app.set('view engine', 'ejs')
app.set('views', 'views')

const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

app.use(async (req, res, next) => {
  req.user = await User.findByPk(1)
  next()
})

app.use('/admin', adminRoutes)
app.use(shopRoutes)

app.use(errorController.get404)

const User = require('./models/user')
require('./models/associations')

connect(async () => {
  try {
    const user = await User.findByPk(1)

    if (!user) {
      await User.create({
        name: 'Russell',
        email: 'rpg_digital@yahoo.co.uk'
      })
    }

    app.listen(process.env.PORT || 8080)
  } catch (err) {
    console.error(err)
  }
})
