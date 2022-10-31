const { DataTypes } = require('sequelize')
const sequelize = require('../util/database')
const Product = require('./product')
const User = require('./user')

const Order = sequelize.define('order',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    }
  }
)

// Junction table for order and Products
const OrderProduct = sequelize.define('orderProduct',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }
)

Order.belongsTo(User)
User.hasMany(Order)
Order.belongsToMany(Product, { through: OrderProduct })
Product.belongsToMany(Order, { through: OrderProduct })

module.exports = Order
