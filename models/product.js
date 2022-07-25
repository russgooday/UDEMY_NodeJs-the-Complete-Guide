const fs = require('fs/promises')
const path = require('path')
const { deepClone } = require('./helpers/clone')
const { setField } = require('./helpers/accessors')
const { v4: uuidv4 } = require('uuid')

const productsPath = path.join(
  path.dirname(require.main.filename),
  'data',
  'products.json'
)

const getProductsFromFile = async function (filePath = productsPath) {
  try {
    const products = await fs.readFile(filePath, 'utf8')

    return (products.length) ? JSON.parse(products) : []
  } catch (err) {
    console.error(err)
  }
}

const saveProducts = async function (callback, filePath = productsPath) {
  try {
    const products = await getProductsFromFile()
    const json = JSON.stringify(callback(products), null, 2)

    await fs.writeFile(filePath, json)
  } catch (err) {
    console.error(err)
  }
}

const addProduct = function (product, filePath = productsPath) {

  saveProducts((products) => {
    return deepClone(products).concat({ ...product })
  })
}

const updateProduct = function (updatedProduct, filePath = productsPath) {

  saveProducts((products) => {
    const foundIndex = products.findIndex(
      (product) => product.id === updatedProduct.id
    )

    return setField(foundIndex, { ...updatedProduct }, products)
  })
}

const deleteProduct = function (id) {

  saveProducts((products) => {
    return deepClone(products).filter(
      (product) => product.id !== id
    )
  })
}

const fetchById = async function (id) {
  const products = await getProductsFromFile()

  return products.find((product) => product.id === id)
}

const createProduct = (props) => ({
  title: props.title,
  author: props.author,
  published: props.published,
  imageUrl: props.imageUrl || '/images/no-image.png',
  summary: props.summary,
  description: props.description,
  price: props.price,
  id: props.id || uuidv4() // if an edit/update should have id already
})

module.exports = {
  fetchById,
  add: addProduct,
  update: updateProduct,
  delete: deleteProduct,
  create: createProduct,
  fetchAll: getProductsFromFile
}
