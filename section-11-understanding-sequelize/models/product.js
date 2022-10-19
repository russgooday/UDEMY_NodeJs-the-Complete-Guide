const { Sequelize } = require('sequelize')
const sequelize = require('../util/database')

const Product = sequelize.define('product',
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    title: {
      type: Sequelize.STRING(100),
      allowNull: false
    },
    author: {
      type: Sequelize.STRING(100),
      allowNull: false
    },
    published: {
      type: Sequelize.STRING(100),
      allowNull: false
    },
    image: {
      type: Sequelize.STRING(100),
      allowNull: false,
      defaultValue: 'no-image.png'
    },
    summary: {
      type: Sequelize.STRING(100),
      allowNull: false
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    price: {
      type: Sequelize.DOUBLE,
      allowNull: false
    }
  }
)

module.exports = Product
