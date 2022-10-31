const getEmptyTypeOf = (obj) => (
  {}.toString.call(obj) === '[object Object]' ? {} : []
)

// if no target is supplied, create an empty target object of source type
const flattenObj = function (source, target = getEmptyTypeOf(source)) {
  // call the toJSON method if it exists on the source model.
  // toJSON simplifies sequelize models into a plain object.
  const src = source.toJSON?.() || source

  if (Array.isArray(src)) {
    let i = src.length

    while (i--) {
      const value = src[i]

      target[i] = (value !== null && typeof value === 'object')
        ? flattenObj(value)
        : value
    }

    return target
  }

  for (const key in src) {
    if ({}.hasOwnProperty.call(src, key)) {
      const value = src[key]

      if ({}.toString.call(value) === '[object Object]') {
        flattenObj(value, target)
      } else {
        target[key] = ({}.toString.call(value) === '[object Array]')
          ? flattenObj(value)
          : value
      }
    }
  }
  return target
}

// module.exports = function (source) {
//   return (isCollection(source))
//     ? flattenObj(source)
//     : source
// }

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

// flattenObj({
//   a: 2,
//   b: [
//     [1, 2, 3],
//     {
//       c: 3
//     }
//   ]
// })
