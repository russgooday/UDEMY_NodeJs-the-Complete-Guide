const httpContext = require('express-http-context')
const Product = require('../product')

const addOrders = async () => {
  const user = httpContext.get('user')

  try {
    const cart = await user.getCart({ include: ['products'] })
    const order = await user.createOrder()

    await Promise.all(
      cart.products.map(async (product) => {
        return await product.addOrder(
          order,
          { through: { quantity: product.cartProduct.quantity } }
        )
      })
    )
    // empty the cart
    await cart.setProducts(null)
    return order
  } catch (err) {
    console.error(err)
  }
}

const getOrders = async () => {
  const user = httpContext.get('user')

  try {
    return await user.getOrders({
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      include: {
        model: Product,
        attributes: { exclude: ['createdAt', 'updatedAt'] },
        through: { attributes: ['orderId', 'quantity'] }
      }
    })
  } catch (err) {
    console.error(err)
  }
}

module.exports = { addOrders, getOrders }

