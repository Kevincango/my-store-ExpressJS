const Joi = require('joi');

const id = Joi.number().integer();
const customerId = Joi.number().integer();

const getOrderSchema = Joi.object({
  id: id.required()
});

const createOrderScheam = Joi.object({
  customerId: customerId.required()
});

module.exports = { getOrderSchema, createOrderScheam};
