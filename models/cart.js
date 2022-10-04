const fs = require('fs/promises')
const path = require('path')
const { deepClone } = require('./helpers/clone')

const cartPath = path.join(
  path.dirname(require.main.filename),
  'data',
  'cart.json'
)

const CreateEmptyCart = () => ({ items: [], totalPrice: 0 })

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

const addItem = function (items, { id, ...props }) {
  const clone = deepClone(items)
  const foundItem = clone.find((item) => item.id === id)

  // if found just update quantity
  if (foundItem) {
    foundItem.quantity += 1
    return clone
  }

  // or add product to cart
  return clone.concat({ id, quantity: 1, ...props })
}

const deleteItem = function (items, id) {
  const clone = deepClone(items)
  const foundItem = clone.find((item) => item.id === id)

  // if more than one found just update quantity
  if (foundItem?.quantity > 1) {
    foundItem.quantity -= 1
    return clone
  }

  // or delete item from cart
  return clone.filter((item) => item.id !== id)
}

const addToCart = function (item) {
  saveCartToFile(
    (cart) => ({
      items: addItem(cart.items, item),
      totalPrice: cart.totalPrice + Number(item.price)
    })
  )
}

const deleteFromCart = function (id) {
  saveCartToFile(
    ({ items, totalPrice }) => {

      return items.reduce((cart, item) => {

        // if not item to delete add item to cart
        if (item.id !== id) {
          cart.items.push(item)
          return cart
        }

        // otherwise it is item to delete, so just update totalPrice
        cart.totalPrice -= Number(item.price) * Number(item.quantity)
        return cart
      }, { items: [], totalPrice })
    }
  )
}

module.exports = {
  fetchAll: getCartFromFile,
  add: addToCart,
  delete: deleteFromCart
}
