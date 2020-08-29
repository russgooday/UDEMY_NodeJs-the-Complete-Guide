const fs = require('fs')
const path = require('path')
const productsPath = path.join(`${process.mainModule.path}/data/products.json`)

const getProductsFromFile = (callback) => {
  fs.readFile(productsPath, (error, fileContent) => {
    callback(!error && fileContent.length ? JSON.parse(fileContent) : [])
  })
}

const getProductFromFile = (title, callback) => {
  fs.readFile(productsPath, (error, fileContent) => {
    callback(
      !error && fileContent.length
        ? JSON.parse(fileContent).find(product => product.title === title)
        : {}
    )
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

  static fetch (title, callback) {
    getProductFromFile(title, callback)
  }

  static fetchAll (callback) {
    getProductsFromFile(callback)
  }
}
