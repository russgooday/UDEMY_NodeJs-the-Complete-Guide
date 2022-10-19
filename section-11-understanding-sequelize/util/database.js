const Sequelize = require('sequelize').Sequelize

const sequelize = new Sequelize(
  'node-complete',
  'russell',
  'sminkey2010',
  {
    dialect: 'mariadb',
    host: 'localhost'
  }
)

module.exports = sequelize
