const flattenObj = require('./flatten')

// fields to be rendered in view
// Todo: can fields from cart_product be merged beforehand?!
const getDisplayFields = (products) => {

  const productsForView = {
    items: products.map(
      (product) => {
        // cartProduct is a nested property cartProduct: { userId, quantity }
        // merge props with product props into one object
        return {
          ...flattenObj(product),
          get subTotal () {
            return this.price * this.quantity
          }
        }
      }
    ),

    get totalPrice () {
      return this.items.reduce((total, item) => {
        return total + item.subTotal
      }, 0)
    }
  }
  console.log(JSON.stringify(productsForView, null, 3))
  return productsForView
}

module.exports = getDisplayFields
