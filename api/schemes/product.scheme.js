const Joi = require('joi');

const id = Joi.string().uuid();
const productName = Joi.string().min(3).max(15);
const price = Joi.number().integer().min(10);
const image = Joi.string().uri();

const createProductSchema = Joi.object({
  productName: productName.required(),
  price: price.required(),
  image: image.required(),
});

const updatedProductSchema = Joi.object({
  productName,
  price,
  image,
});

const getProductSchema = Joi.object({
  id: id.required(),
});

module.exports = { createProductSchema, updatedProductSchema, getProductSchema};
