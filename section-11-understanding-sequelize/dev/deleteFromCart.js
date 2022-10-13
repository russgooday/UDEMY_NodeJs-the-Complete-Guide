const deleteProduct = function (id, productPrice) {

  fs.readFile(filePath, (err, fileContent) => {

    if (err) return

    const { products, totalPrice } = JSON.parse(fileContent)

    const updatedCart = products.reduce((cart, product) => {

      // if not product to delete add product to cart
      if (product.id !== id) {
        cart.products.push(product)
        return cart
      }

      // otherwise it is product to delete, so just update totalPrice
      cart.totalPrice -= Number(product.price) * Number(product.quantity)
      return cart
    }, { products: [], totalPrice })

    fs.writeFile(filePath, JSON.stringify(updatedCart), console.log)
  })
}

const deleteProduct = function (id, productPrice) {

  fs.readFile(filePath, (err, fileContent) => {

    if (err) return

    // JSON.parse creates a new object, why shallow clone?
    let { products, totalPrice } = JSON.parse(fileContent)

    products = products.flatMap((product) => {

      // if not product to delete add product to products
      if (product.id !== id) return [product]

      // otherwise it is product to delete, so just update totalPrice
      totalPrice -= Number(productPrice) * Number(product.quantity)
      return []
    })

    fs.writeFile(filePath, JSON.stringify({ products, totalPrice }), console.log)
  })
}
