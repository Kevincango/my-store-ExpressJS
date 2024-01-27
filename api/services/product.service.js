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
    const newProduct = {
      id: faker.string.uuid(),
      ...data,
    };
    return newProduct;
  }
  async udpate(id, changes){
    const index = this.products.findIndex(p => p.id === id);
    if(index === -1){
      throw boom.notFound('Product not found');
    }
    const originalProduct = this.products[index];
    this.products[index] = {
      ...originalProduct,
      ...changes,
    };
    return this.products[index];
  }
  async allProducts(){
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.products);
      },5000);
    });
  }
  async product(id){
    const product = this.products.find(p => p.id === id);
    if(!product){
      throw boom.notFound('Product not found');
    }
    if(product.isBlock){
      throw boom.conflict('product is block');
    }
    return product;
  }
  async delete(id){
    const index = this.products.findIndex(p => p.id === id);
    if(index === -1){
      throw new Error('Product not found!');
    }
    return {
      message: 'Delete product succesful',
      data: this.products.splice(index, 1),
  }
  }
  async find(){
    const rta = await models.User.findAll();
    return rta;
  }
}

module.exports = ProductsService;
