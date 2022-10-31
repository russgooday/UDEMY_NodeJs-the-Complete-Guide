const httpContext = require('express-http-context')
const Product = require('../product')

const addProduct = async (id) => {
  const user = httpContext.get('user')

  try {
    const cart = await user.getCart()
    const [product] = await cart.getProducts({ where: { id } })

    await ((product)
      ? product.cartProduct.increment('quantity')
      : cart.addProduct(await Product.findByPk(id))
    )
  } catch (err) {
    console.error(err)
  }
}

const removeProduct = async (id) => {
  const user = httpContext.get('user')

  try {
    const cart = await user.getCart({
      include: {
        model: Product,
        where: { id }
      }
    })

    await cart.removeProduct(cart.products[0])
  } catch (err) {
    console.error(err)
  }
}

module.exports = { addProduct, removeProduct }
