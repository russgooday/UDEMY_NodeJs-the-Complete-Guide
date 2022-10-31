const httpContext = require('express-http-context')
const User = require('../models/user')
require('../models/order')

const getUser = async (id = 1) => {

  const [user] = await User.findOrCreate({
    where: { id },
    defaults: {
      name: 'Russell',
      email: 'rpg_digital@yahoo.co.uk'
    }
  })

  return user
}

// Only creates a cart for user if one doesn't exist
const createCart = async (user) => {
  const cart = await user.getCart()

  if (!cart) {
    await user.createCart()
  }

  return cart
}

const initaliseUser = async (req, res, next) => {
  try {
    req.user = await getUser()
    httpContext.set('user', req.user)
    await createCart(req.user)

    next()
  } catch (err) {
    console.error(err)
  }
}

module.exports = initaliseUser
