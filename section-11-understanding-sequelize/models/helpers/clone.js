/**
 * _deepClone internal (Optimised)
 * @param {Object|Array} Object collection of type Array or Object
 * @returns {Object|Array} Clone of input collection
 * Recursive function that clones own object properties.
 * Does not include cloning of Accessors and Symbols.
 */

const _deepClone = function (source) {

  // if Date Object
  if (source instanceof Date) return new Date(source.getTime())

  // if Array collection
  // {}.toString call is faster than Array.isArray

  if ({}.toString.call(source) === '[object Array]') {
    const clone = []
    let i = source.length

    while (i--) {
      const value = source[i]

      clone[i] = (value !== null && typeof value === 'object')
        ? _deepClone(value)
        : value
    }

    return clone
  }

  // if Object collection

  const clone = {}

  // for ... in is faster than for ... of and Object.keys
  // {}.hasOwnProperty is faster than Object.prototype.hasOwnPropery

  for (const key in source) {
    if ({}.hasOwnProperty.call(source, key)) {
      const value = source[key]

      clone[key] = (value !== null && typeof value === 'object')
        ? _deepClone(value)
        : value
    }
  }

  return clone
}

// if a primitve value or null returns value as is.
module.exports = function (source) {
  return (source !== null && typeof source === 'object')
    ? _deepClone(source)
    : source
}
