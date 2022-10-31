const flattenObj = require('./flatten')

// fields to be rendered in view
// Todo: can fields from cart_product be merged beforehand?!
const getDisplayFields = (orders) => {

  const ordersForView = {
    orders: orders.map(
      (order) => {
        const { products, ...orderProps } = flattenObj(order)

        return {
          ...orderProps,
          items: products.map(
            (product) => ({
              ...product,
              get subTotal () {
                return this.price * this.quantity
              }
            })
          ),
          get totalPrice () {
            return this.items.reduce((total, item) => {
              return total + item.subTotal
            }, 0)
          }
        }
      }
    ),

    get totalPrice () {
      return this.orders.reduce((total, order) => {
        return total + order.totalPrice
      }, 0)
    }
  }

  return ordersForView
}

module.exports = getDisplayFields
