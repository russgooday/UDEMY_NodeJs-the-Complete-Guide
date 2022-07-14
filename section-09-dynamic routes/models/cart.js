const fs = require('fs/promises')
const path = require('path')

const cartPath = path.join(
  path.dirname(require.main.filename),
  'data',
  'cart.json'
)

const CreateEmptyCart = () => ({ products: [], totalPrice: 0 })

const getCartFromFile = async function (filePath = cartPath) {
  try {
    const cart = await fs.readFile(filePath, 'utf8')

    return (cart) ? JSON.parse(cart) : CreateEmptyCart()
  } catch (err) {
    console.error(err)
  }
}

const saveCartToFile = async function (callback, filePath = cartPath) {
  try {
    const cart = await getCartFromFile(filePath)
    const json = JSON.stringify(callback(cart), null, 2)

    await fs.writeFile(filePath, json)
  } catch (err) {
    console.error(err)
  }
}

const deepClone = (source) => JSON.parse(JSON.stringify(source))

const addProduct = function (products, { id, ...props }) {
  const clone = deepClone(products)
  const foundProduct = clone.find((product) => product.id === id)

  if (foundProduct) {
    foundProduct.quantity += 1
    return clone
  }

  return clone.concat({ id, quantity: 1, ...props })
}

const addProductToCart = function (product) {
  saveCartToFile(
    (cart) => ({
      products: addProduct(cart.products, product),
      totalPrice: cart.totalPrice + Number(product.price)
    })
  )
}

module.exports = {
  fetch: getCartFromFile,
  add: addProductToCart
}
