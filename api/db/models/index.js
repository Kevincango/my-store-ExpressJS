const { User, userSchema} = require('./user.mode');
const { Customer, customerSchema } = require('./customer.model');

function setupModels(sequelize){
  User.init(userSchema, User.config(sequelize));
  Customer.init(customerSchema, Customer.config(sequelize));

  User.assocciate(sequelize.models);
  Customer.associate(sequelize.models);
}

module.exports = setupModels;
