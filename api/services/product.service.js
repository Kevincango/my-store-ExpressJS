const { faker } = require('@faker-js/faker');
const { models } = require('../libs/sequelize');
const  boom = require('@hapi/boom');
const { Op } = require('sequelize');

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
    const newProduct = await models.Product.create(data);
    return newProduct;
  }
  async udpate(id, changes){
    const user = await this.product(id);
    const rta = await user.update(changes);
    return rta;
  }
  async allProducts(query){
    const options = {
      include: ['category'],
      where: {}
    };
    const { limit, offset } = query;
    if(limit && offset){
      options.limit = limit;
      options.offset = offset;
    }
    const { price } = query;

    if(price){
      options.where.price = price;
    }

    const { price_min, price_max} = query;
    if(price_min && price_max){
      options.where.price = {
        [Op.gte]: price_min,
        [Op.lte]: price_max
      };
    }

    const products = await models.Product.findAll(options);
    return products;
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
    const rta = await models.User.findAll({
      include: ['customer']
    });
    return rta;
  }
}

module.exports = ProductsService;
