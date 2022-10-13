const db = require('../util/database')
const Cart = require('./cart')

const productSchema = {
  title: (value = '') => String(value),
  author: (value = '') => String(value),
  published: (value = '') => String(value),
  image: (value = '') => String(value || 'no-image.png'),
  summary: (value = '') => String(value),
  description: (value = '') => String(value),
  price: (value = 0) => Number(value)
}

const createProduct = (props) => {
  const product = {}

  for (const key in productSchema) {
    product[key] = (key in props)
      ? productSchema[key](props[key])
      : productSchema[key]()
  }

  return product
}

const fetch = async function (query, params) {
  try {
    return await db.execute(query, params)
  } catch (error) {
    console.error(error)
  }
}

const fetchAll = async function () {
  return await fetch('SELECT * FROM products')
}

const fetchById = async function (id) {
  return await fetch('SELECT * FROM products WHERE id = ?', [id])
}

const joinByComma = (items) => items.join(', ')

const addProduct = async function (product) {
  const columnNames = Object.keys(product)
  const values = Object.values(product)
  const placeHolders = new Array(columnNames.length).fill('?')

  const [response] = await fetch(`
    INSERT INTO products (${joinByComma(columnNames)})
    VALUES(${joinByComma(placeHolders)})
  `, [...values])

  return await fetchById(response.insertId)
}

const setPlaceHolder = (columnName) => `${columnName} = ?`

const updateProduct = async function (id, props) {
  const values = Object.values(props)
  const placeHolders = Object.keys(props).map(setPlaceHolder)

  await fetch(`
    UPDATE products
    SET ${joinByComma(placeHolders)}
    WHERE id = ?
  `, [...values, id])

  return await fetchById(id)
}

const deleteProduct = async function (id) {

  await fetch(`
    DELETE FROM products
    WHERE id = ?
  `, [id])

  // Cart.delete(id)
}

module.exports = {
  fetchAll,
  fetchById,
  createProduct,
  add: addProduct,
  update: updateProduct,
  delete: deleteProduct
}
