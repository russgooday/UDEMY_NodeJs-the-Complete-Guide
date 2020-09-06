## The Model View Controller (MVC)

#### Models
* Represent your data in your code
* Work with your data ( e.g. save fetch )

#### Views
* What the user sees ( The output rendered with EJS, PUG, Handlebars, HTML etc )
* Decoupled from your application code

#### Routes and Controllers
##### Routes
Depending upon which path or which http method ( POST/GET ), routes select which controller is executed

##### Controllers
* Connect your Models and your Views
* Contain the *in-between* logic