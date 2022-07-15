### Sample of code from tutorial.
The following is a sample from the tutorial's models/products.js, which adds CRUD functionality.

```javascript
save() {
    getProductsFromFile(products => {
      if (this.id) {
        const existingProductIndex = products.findIndex(
          prod => prod.id === this.id
        );
        const updatedProducts = [...products];
        updatedProducts[existingProductIndex] = this;
        fs.writeFile(p, JSON.stringify(updatedProducts), err => {
          console.log(err);
        });
      } else {
        this.id = Math.random().toString();
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), err => {
          console.log(err);
        });
      }
    });
  }

  static deleteById(id) {
    getProductsFromFile(products => {
      const product = products.find(prod => prod.id === id);
      const updatedProducts = products.filter(prod => prod.id !== id);
      fs.writeFile(p, JSON.stringify(updatedProducts), err => {
        if (!err) {
          Cart.deleteProduct(id, product.price);
        }
      });
    });
  }
```
### A different approach

I opted to create separate functions, which for one avoided the save function having to use if/else blocks and perform multiple tasks — one function, one task!

To achieve this I added a callback parameter to the save function, which then passes the products array to the given callback — that could be a callback which filters out a product we want to delete — before saving the returned result.

Furthermore I used ramda js for deep cloning and setting, to avoid mutating the passed in products array.
```javascript
const { clone, set, lensProp } = require('ramda')
...

const saveProducts = async function (callback, filePath = productsPath) {
  try {
    const products = await getProductsFromFile()
    const json = JSON.stringify(callback(products), null, 2)

    await fs.writeFile(filePath, json)
  } catch (err) {
    console.error(err)
  }
}

const addProduct = function (product) {

  saveProducts((products) => {
    return clone(products).concat({ ...product })
  })
}

const updateProduct = function (updatedProduct) {

  saveProducts((products) => {
    const productIndex = products.findIndex(
      (product) => product.id === updatedProduct.id
    )
    // using ramdajs' lens methods to replace the product
    return set(lensProp(productIndex), { ...updatedProduct }, clone(products))
  })
}

const deleteProduct = function (id) {

  saveProducts((products) => {
    return clone(products).filter(
      (product) => product.id !== id
    )
  })
}
...
```