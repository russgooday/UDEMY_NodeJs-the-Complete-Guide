const mysql = require('mysql2')

const pool = mysql.createPool({
  host: 'localhost',
  user: 'russell',
  password: 'sminkey2010',
  database: 'node-complete'
})

module.exports = pool.promise()
