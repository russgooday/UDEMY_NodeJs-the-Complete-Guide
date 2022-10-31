const { Sequelize } = require('sequelize')
const sequelize = require('../util/database')
const Product = require('./product')
const Cart = require('./cart')

const User = sequelize.define('user',
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false
    }
  }
)

// Users → Products : One → Many or Each user has many products
Product.belongsTo(User, { constraints: 'restricted', onDelete: 'CASCADE' })
User.hasMany(Product)
// Users → Carts : One → One or Each User has one Cart
User.hasOne(Cart)
Cart.belongsTo(User)

module.exports = User
