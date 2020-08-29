const
    path    = require('path'),
    express = require('express'),
    router  = express.Router(),
    basedir = require('../utils/path')

/* Will be picked up on our baseurl eg. homepage */
router.get('/', (req, res) => {
    res.sendFile(path.normalize(`${basedir}/views/shop.html`))
})

module.exports = router;