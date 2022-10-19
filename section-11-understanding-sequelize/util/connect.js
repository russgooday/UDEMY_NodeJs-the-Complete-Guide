const sequelize = require('./database')

const connect = async (cb, force = false) => {
  try {
    const response = await sequelize.sync({ force })
    cb(response)
  } catch (err) {
    console.error(err)
  }
}

module.exports = connect
