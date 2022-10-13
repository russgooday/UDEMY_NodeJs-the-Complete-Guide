const fs = require('fs/promises')
const path = require('path')
const { deepClone } = require('./helpers/clone')
const { propEquals } = require('./helpers/accessors')
const idEquals = propEquals('id')

const cartPath = path.join(
  path.dirname(require.main.filename),
  'data',
  'cart.json'
)

const createCart = () => ({
  items: [],
  totalPrice: 0
})

const getCartFromFile = async function (filePath = cartPath) {
  try {
    const cart = await fs.readFile(filePath, 'utf8')

    return (cart) ? JSON.parse(cart) : createCart()
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

const addToCart = async function (id, productPrice) {
  await saveCartToFile(
    (cart) => {
      const clone = deepClone(cart)
      const foundItem = clone.items.find(idEquals(id))

      if (foundItem) {
        foundItem.quantity += 1
        foundItem.subTotal = foundItem.quantity * productPrice
      } else {
        clone.items.push({ id, subTotal: productPrice, quantity: 1 })
      }

      clone.totalPrice = clone.totalPrice + productPrice
      return clone
    }
  )
}

const updateCart = async function (id, price, quantity) {
  await saveCartToFile(
    (cart) => {
      return cart.items.reduce((cart, item) => {
        const clonedItem = { ...item }

        // there is a match update the cart item subTotal
        if (item.id === id) {
          if (!isNaN(quantity)) clonedItem.quantity = quantity

          clonedItem.subTotal = clonedItem.quantity * price
        }

        cart.items.push(clonedItem)
        // add each subTotal to totalPrice
        cart.totalPrice += clonedItem.subTotal

        return cart
      }, { items: [], totalPrice: 0 })
    }
  )
}

const removeFromCart = async function (id) {
  await saveCartToFile(
    (cart) => {
      let totalPrice = cart.totalPrice

      const items = cart.items.flatMap((item) => {
        if (item.id === id) {
          totalPrice -= item.subTotal
          return []
        }
        return { ...item }
      })

      return { items, totalPrice }
    }
  )
}

module.exports = {
  fetchAll: getCartFromFile,
  add: addToCart,
  remove: removeFromCart,
  update: updateCart
}
