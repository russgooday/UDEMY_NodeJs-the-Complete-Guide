const { curry2, curry3 } = require('./curry')
const { deepClone } = require('./clone')

/**
   * getByPath
   * @param {Array [String|Number]} keys
   * @param {Object|Array} source
   * @returns Clone of target property in collection or undefined
   * getByPath(['names', 1], { names: ['Joe', 'Bloggs'] }) -> 'Bloggs'
   */

const _getByPath = function (keys, source) {
  let value = source

  for (const key of keys) {
    if (!{}.hasOwnProperty.call(value, key)) return undefined
    value = value[key]
  }

  return deepClone(value)
}

/**
   * setByPath
   * @param {Array [String|Number]} keys
   * @param {Object|Primitive} value
   * @param {Object|Array} source
   * @returns Modified clone of the source object with the target path property set to value
   * If elements in the path don't exist on the source object they will be created.
   * setByPath(['a', 'b'], 2, {c: 1}) -> {a: {b: 2}, c: 1}
   */

const _setByPath = function (keys, value, source) {
  const target = deepClone(source)
  let [currKey, nextKey] = keys
  let node = target
  let i = 1

  while (nextKey !== undefined) {

    if (!{}.hasOwnProperty.call(node, currKey)) {
      node[currKey] = isNaN(nextKey) ? {} : []
    }

    node = node[currKey]
    currKey = keys[i]
    nextKey = keys[++i]
  }

  node[currKey] = value

  return target
}

/**
   * setField
   * @param {String} key
   * @param {Object|Primitive} value
   * @param {Object|Array} obj
   * @returns Clone of source Object with field modified to value
   * setField('a', 3, {a: 2}) -> {a: 3}
   * setField(1, 'c', ['a', 'b']) -> ['a', 'c']
   */

const _setField = function (key, value, obj) {
  const clone = deepClone(obj)
  clone[key] = value

  return clone
}

// --- Public functions ---

// Curried versions of getter and setter functions

const getByPath = curry2((keys, source) => _getByPath(keys, source))

const setByPath = curry3((keys, value, source) => _setByPath(keys, value, source))

const getField = curry2((key, obj) => obj[key])

const setField = curry3((key, value, obj) => _setField(key, value, obj))

// Lenses

/**
 * lens
 * @param {function} getter
 * @param {function} setter
 * @returns {Object} Object with getter and setter methods
 */

const lens = (getter, setter) => ({ getter, setter })

/**
 * lensPath
 * @param {Array} path : path to focus on (see getByPath and setByPath)
 * @returns {Object} Object with getter and setter methods focused on given path
 */

const lensPath = (path) => lens(getByPath(path), setByPath(path))

/**
 * lensProp
 * @param {String|Number} key : Object[key] | Array[index]
 * @returns {Object} Object with getter and setter methods focused on given key
 */

const lensProp = (key) => lens(getField(key), setField(key))

/**
 * set
 * @param {Object} lens
 * @param {Object|Primitive} value
 * @param {Object|Array} obj
 * @returns Curried function that modifies a focused property in an object.
 * Only modifies and returns a clone of the source object.
 * set(lensProp('b'), 3, {a: 2, b: 1}) -> {a: 2, b: 3}
 * set(lensPath(['b', 0]), 3, {a: 2}) -> {a: 2, b: [3]}
 */
const set = curry3((lens, value, obj) => lens.setter(value, deepClone(obj)))

/**
 * over
 * @param {Object} lens
 * @param {Function} value
 * @param {Object|Array} obj
 * @returns Similar to set, but instead of explicitly setting a value
 * calls a mapping function on the focused property.
 * over(lensProp('b'), (x) => x + 1, {a: 2, b: 1}) -> {a: 2, b: 2}
 */
const over = curry3((lens, mapFn, obj) => lens.setter(mapFn(lens.getter(obj)), deepClone(obj)))

module.exports = {
  deepClone,
  getField,
  setField,
  setByPath,
  lensPath,
  lensProp,
  set,
  over
}
