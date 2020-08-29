const express = require('express')

const app = express()

app.use('/', (req, res, next) => {
  console.log('Always run')
  next()
})

app.use('/add-product', (req, res, next) => {
  console.log('In the first middleware')
  res.send('<h4>In the first middleware</h4>')
})

app.use('/', (req, res, next) => {
  console.log('In the second middleware')
  res.send('<h4>In the second middleware</h4>')
})

app.listen(3000)
