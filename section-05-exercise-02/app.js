const 
    port        = 3000,
    path        = require('path'),
    express     = require('express'),
    app         = express(),

    /* import mini Router modules for specific pages */
    usersRoutes = require('./routes/users'),
    indexRoutes = require('./routes/index')

/* living life dangerously */
app.use(express.urlencoded({extended : false}))

/* Watch a static path and subfolders for our CSS, JS files etc */
app.use(express.static(path.normalize(`${__dirname}/public`)))

app.use('/admin', usersRoutes)
app.use(indexRoutes)

app.use((req, res) => {
    res.status(404).send(`<h1>Error 404 : No page here.</h1>`)
})

app.listen(port)
