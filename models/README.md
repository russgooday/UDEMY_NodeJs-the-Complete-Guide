### Sample from tutorial.
The following is a sample where CRUD functionality has been added to the tutorial's models/products.js

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
### Callbacks instead

Instead of hard-coding the save function to update and add products, I opted to have the function take a callback instead.

The given callback is applied to the fetched products array before saving the returned result. As an example the callback could be a function which filters out a product that needs to be deleted.

By doing it this way I could separate the CRUD tasks into separate functions — one task one function!

#### Functional programming

In addition I created [deep cloning](./helpers/clone.js) and [setting](./helpers/accessors.js) functions. Unlike the ...spread shallow clone used in the tutorial these functions properly avoid mutating the fetched products.

I had previously written base versions of these scripts and in my tests the final deepClone was considerably more performant than JSON.parse/JSON.stringify or lodash's cloneDeep — about 4x faster in firefox and 2.5-3x in chrome.

```javascript
// import functional helper scripts
const { deepClone } = require('./helpers/clone')
const { setField } = require('./helpers/accessors')
...

/**
 * saveProducts
 * @params{function} callback
 * @params{String} filePath
 * apply callback to fetched products and save returned result to file.
 */

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
    return deepClone(products).concat({ ...product })
  })
}

const updateProduct = function (updatedProduct) {

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
...
```

At this point in the tutorial I think that using callbacks is an improvement over the hard-coded version.