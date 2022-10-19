const Product = require('./product')
const User = require('./user')
const Cart = require('./cart')
const CartItem = require('./cart-item')

Product.belongsTo(
  User,
  {
    constraints: true,
    onDelete: 'CASCADE'
  }
)

User.hasMany(Product)
Cart.belongsTo(User)
Cart.belongsToMany(Product, { through: CartItem })
