const { User, userSchema} = require('./user.mode');
const { Customer, customerSchema } = require('./customer.model');
const { Category, CategorySchema} = require('./category.models');
const { Product, ProductSchema} = require('./products.model');

function setupModels(sequelize){
  User.init(userSchema, User.config(sequelize));
  Customer.init(customerSchema, Customer.config(sequelize));
  Category.init(CategorySchema, Category.config(sequelize));
  Product.init(ProductSchema, Product.config(sequelize));

  User.assocciate(sequelize.models);
  Customer.associate(sequelize.models);
  Category.associate(sequelize.models);
  Product.associate(sequelize.models);
}

module.exports = setupModels;
