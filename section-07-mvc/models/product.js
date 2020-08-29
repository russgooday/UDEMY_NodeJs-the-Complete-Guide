const fs = require('fs')

const createProduct = (title) => {
  return { title }
}

const getProductsFromFile = (productsPath, callback) => {
  fs.readFile(productsPath, (error, fileContent) => {
    callback(!error && fileContent.length ? JSON.parse(fileContent) : [])
  })
}

const saveProductsToFile = (productsPath, callback) => {
  getProductsFromFile(
    productsPath,
    products => {
      fs.writeFile(
        productsPath,
        JSON.stringify(callback(products)),
        (error) => {
          console.log(error)
        })
    }
  )
}

module.exports = {
  createProduct,
  getProductsFromFile,
  saveProductsToFile
}
