const productsRouter = require('./products');
const usersRouter = require('./users');
const categoriesProducts = require('./categories');

function routerApi(app){
  app.use('/products', productsRouter);
  app.use('/users', usersRouter);
  app.use('/categories', categoriesProducts);
}

module.exports = routerApi;
