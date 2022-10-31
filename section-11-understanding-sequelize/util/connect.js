const sequelize = require('./database')

const connect = async (force = false) => {
  try {
    return await sequelize.sync({ force })
  } catch (err) {
    console.error(err)
  }
}

module.exports = connect
