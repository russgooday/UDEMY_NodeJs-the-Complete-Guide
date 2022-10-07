const fs = require('fs/promises')
const path = require('path')
const Cart = require('./cart')
const { deepClone } = require('./helpers/clone')
const { propEquals, not } = require('./helpers/accessors')
const { v4: uuidv4 } = require('uuid')

const idEquals = propEquals('id')
const idNotEquals = (val) => not(propEquals('id', val))

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

    await fs.writeFile(filePath, json, (err) => {
      if (!err) console.log('file saved')
    })
  } catch (err) {
    console.error(err)
  }
}

const addProduct = function (product) {

  saveProducts((products) => {
    const updatedProducts = deepClone(products)
    updatedProducts.push({ ...product })

    return updatedProducts
  })
}

const updateProduct = async function (updatedProduct) {
  const { id, price } = updatedProduct

  await saveProducts(
    (products) => {
      return products.map(
        (product) => (product.id === id)
          ? { ...updatedProduct }
          : { ...product }
      )
    }
  )

  Cart.update(id, price)
}

const deleteProduct = async function (id) {

  await saveProducts((products) => {
    return deepClone(products).filter(idNotEquals(id))
  })

  Cart.delete(id)
}

const fetchById = async function (id) {
  const products = await getProductsFromFile()

  return products.find(idEquals(id))
}

const createProduct = (props) => ({
  title: props.title,
  author: props.author,
  published: props.published,
  image: props.image || 'no-image.png',
  summary: props.summary,
  description: props.description,
  price: Number(props.price),
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
