const
  path = require('path')
const baseDir = process.mainModule.path

const config = {
  layoutsDir: path.join(baseDir, 'views/layouts'),
  partialsDir: path.join(baseDir, 'views/partials'),
  defaultLayout: 'main-layout',
  extname: 'hbs',

  helpers: {
    isActive (givenPath) {
      if (givenPath === this.path) return ' active'
    },

    hasLength (obj) {
      return (!!obj.length)
    },

    styleSheet (css) {
      return `<link rel='stylesheet' type='text/css' href='/css/${css}'>`
    }
  }
}

module.exports = config
