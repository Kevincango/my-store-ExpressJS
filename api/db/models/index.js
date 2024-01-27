const { User, userSchema} = require('./user.mode');

function setupModels(sequelize){
  User.init(userSchema, User.config(sequelize));
}

module.exports = setupModels;
