require('dotenv').config()
const Sequelize = require('sequelize').Sequelize

const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    dialect: 'mariadb',
    host: process.env.HOST
  }
)

module.exports = sequelize
