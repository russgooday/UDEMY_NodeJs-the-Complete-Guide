const path = require('path')

/*
    dirname strips off the end file in the filename
    E:\webdev\Node JS\Section-05\shop.js
    => E:\webdev\Node JS\Section-05
*/
module.exports = path.dirname(process.mainModule.filename)
