// Cut down rendition of RamdaJs' optimised implentation
// switch cases in reverse order
const curry2 = (fn) => {
  return function (x, y) {
    switch (arguments.length) {
      case 2:
        return fn(x, y)
      case 1:
        return (y) => fn(x, y)
      case 0:
        return fn
      default:
        return fn(x, y)
    }
  }
}

const curry3 = (fn) => {
  return function (x, y, z) {
    switch (arguments.length) {
      case 3:
        return fn(x, y, z)
      case 2:
        return (z) => fn(x, y, z)
      case 1:
        return curry2((y, z) => fn(x, y, z))
      case 0:
        return fn
      default:
        return fn(x, y, z)
    }
  }
}

module.exports = { curry2, curry3 }
