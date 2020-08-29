const fs = require('fs')
const path = require('path')
const productsPath = path.join(`${process.mainModule.path}/data/products.json`)

const getProductsFromFile = (callback) => {
  fs.readFile(productsPath, (error, fileContent) => {
    callback(!error && fileContent.length ? JSON.parse(fileContent) : [])
  })
}

module.exports = class Product {
  constructor ({ title, imageUrl, description, price }) {
    this.title = title
    this.imageUrl = imageUrl
    this.description = description
    this.price = price
  }

  saveProductsToFile () {
    getProductsFromFile(
      products => {
        products.push(this)
        fs.writeFile(
          productsPath,
          JSON.stringify(products),
          error => {
            if (error) console.log(error)
          })
      }
    )
  }

  static fetchAll (callback) {
    getProductsFromFile(callback)
  }
}
