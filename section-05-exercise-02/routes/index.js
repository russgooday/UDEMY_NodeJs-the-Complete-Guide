const
    path    = require('path'),
    express = require('express'),
    router  = express.Router(), /* Mini express router module */
    basedir = process.mainModule.path

router.get('/', (req, res) => {

    res.sendFile(path.normalize(`${basedir}/views/index.html`))
})

module.exports = router