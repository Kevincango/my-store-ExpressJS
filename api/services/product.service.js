const { faker } = require('@faker-js/faker');
const { models } = require('../libs/sequelize');
const  boom = require('@hapi/boom');

class ProductsService{

  constructor(){
    this.products = [];
    this.generate();
  }
  async generate(){
    const limit = 10;
    for(let i = 0; i < limit; i++){
    this.products.push({
    id: faker.string.uuid(),
    productName: faker.commerce.productName(),
    price: parseInt(faker.commerce.price()),
    image: faker.image.url(),
    isBlock: faker.datatype.boolean(),
    });
  }
  }
  async create(data){
    const newUser = await models.User.create(data);
    return newUser;
  }
  async udpate(id, changes){
    const user = await this.product(id);
    const rta = await user.update(changes);
    return rta;
  }
  async allProducts(){
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.products);
      },5000);
    });
  }
  async product(id){
    const user = await models.User.findByPk(id);
    if(!user){
      throw boom.notFound('user not found');
    }
    return user;
  }
  async delete(id){
    const user = await this.product(id);
    await user.destroy();
    return { id };
  }
  async find(){
    const rta = await models.User.findAll();
    return rta;
  }
}

module.exports = ProductsService;
