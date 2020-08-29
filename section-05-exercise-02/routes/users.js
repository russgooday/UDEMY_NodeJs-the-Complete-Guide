const
    path    = require('path'),
    express = require('express'),
    router  = express.Router(),
    basedir = process.mainModule.path

router.get('/users', (req, res) => {

    res.sendFile(path.normalize(`${basedir}/views/users.html`))
})

module.exports = router