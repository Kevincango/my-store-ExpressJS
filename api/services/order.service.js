//const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');

class OrderService {
  constructor(){

  }
  async create(data){
    const newOrder = await models.Order.create(data);
    return newOrder;
  }
  async addItem(item){
    const newItem = await models.OrderProduct.create(item);
    return newItem;
  }
  async find(){
    const orders = await models.Order.findAll();
    return orders;
  }
  async findOne(id){
    const order = await models.Order.findByPk(id, {
      include: [{association: 'customer', include: ['user']},
      'items']
    });
    return order;
  }
  async update(id, changes){
    const order = await this.findOne(id);
    const orderUpdate = await order.update(changes);
    return orderUpdate;
  }
}

module.exports = OrderService;
