/* set __basedir to root directory */
global.__basedir = __dirname;

const
    path        = require('path'),
    express     = require('express'),
    app         = express(),
    adminRoutes = require('./routes/admin'),
    shopRoutes  = require('./routes/shop')

/* 
    NPM ejs - Templating alternative for HTML files
    # app.set('view engine', 'ejs'); 
*/

/*  
    NPM body-parser, currently included in Express
    parses request bodies in middleware to req.body
*/
app.use(express.urlencoded({ extended : false }))
app.use(express.static(path.join(__dirname, )))

/* here we are setting a base path for adminRoutes eg. /admin/add-product */
app.use('/admin', adminRoutes)
app.use(shopRoutes)

/* If we end up here a specific page has not been found */
app.use((req, res, next) => {
    res.status(404).sendFile(
        path.normalize(`${__dirname}/views/error-404.html`)
    )
})

app.listen(3000);