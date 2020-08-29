const
    path        = require('path'),
    express     = require('express'),
    router      = express.Router(),
    basedir     = require('../utils/path') /* process.mainModule.path (possibly?) */

/* 
    Note: in app.js we have set a base path of /admin/
    so this will be admin/add-product
*/    
router.get('/add-product', (req, res) => {
    
    /* Using EJS Templating
        # res.render('../views/add-product' ,{
        #     baseurl: req.baseUrl
        # }) 
    */
    
    res.sendFile(
        path.normalize(`${basedir}/views/add-product.html`)
    )
})

/*
    and this will be admin/add-product
*/
router.post('/add-product', (req, res) => {

    console.log(req.body.title)
    res.redirect('/')   
})

module.exports = router;