const getPlain = (sequelObj) => sequelObj.get({ plain: true })
const isObject = (obj) => ({}.toString.call(obj) === '[object Object]')

const flattenObj = function (source, parent = source.constructor()) {

  for (const key in source) {

    if (({}.hasOwnProperty.call(source, key))) {
      const value = source[key]

      // if a primitive value
      if (typeof value !== 'object') {
        // if not an existing key assign value
        if (!(key in parent)) parent[key] = value
        continue
      }

      // both parent and value are objects then merge props
      if (isObject(parent) && isObject(value)) {
        flattenObj(value, parent)
      } else {
        parent[key] = flattenObj(value, value.constructor())
      }
    }
  }

  return parent
}

module.exports = flattenObj

flattenObj({
  a: 2,
  b: [
    {
      c: 4,
      d: {
        c: 6,
        f: {
          g: 5
        }
      },
      x: 2
    }
  ]
})

flattenObj({
  a: 2,
  b: [
    [1, 2, 3],
    {
      c: 3
    }
  ]
})
