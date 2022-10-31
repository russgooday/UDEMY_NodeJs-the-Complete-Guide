const httpContext = require('express-http-context')
const Product = require('../product')

const getProducts = async () => {
  const user = httpContext.get('user')

  try {
    return await user.getProducts()
  } catch (err) {
    console.error(err)
  }
}

const getProduct = async (id) => {
  try {
    return await Product.findByPk(id)
  } catch (err) {
    console.error(err)
  }
}

const getCart = async () => {
  const user = httpContext.get('user')

  try {
    // making use of Eager loading to include products
    const cart = await user.getCart({
      include: {
        model: Product,
        attributes: { exclude: ['createdAt', 'updatedAt'] },
        // cartProduct junction table
        through: { attributes: ['cartId', 'quantity'] }
      }
    })
    return cart
  } catch (err) {
    console.error(err)
  }
}

module.exports = { getProduct, getProducts, getCart }
