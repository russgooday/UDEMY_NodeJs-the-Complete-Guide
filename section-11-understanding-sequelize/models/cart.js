const { Sequelize, DataTypes } = require('sequelize')
const sequelize = require('../util/database')
const Product = require('./product')

const Cart = sequelize.define('cart',
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    }
  }
)

// Junction table for Carts and Products
const CartProduct = sequelize.define('cartProduct',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    }
  }
)

// Carts ← CartProducts → Products : Many ← junction table → Many
// Carts have many products, products can be held by many carts
// CartItem acts as a junction table between Cart and Product
Cart.belongsToMany(Product, { through: CartProduct })
Product.belongsToMany(Cart, { through: CartProduct })
Cart.hasMany(CartProduct)
CartProduct.belongsTo(Cart)
Product.hasMany(CartProduct)
CartProduct.belongsTo(Product)

module.exports = Cart
