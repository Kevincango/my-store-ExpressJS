const express = require('express');
const ProductsService = require('../services/product.service');
const validatorHandler = require('../middlewares/validatorHandler');
const {createProductSchema, updatedProductSchema, getProductSchema, queryProductSchema} = require('../schemes/product.scheme');
//const { createUserSchema, updateUserSchema, getUserSchema } = require('../schemes/user.schema');
const service = new ProductsService();
const router = express.Router();


router.get('/', validatorHandler(queryProductSchema, 'query'), async (req, res,next) => {
  try{
    const products = await service.allProducts(req.query);
    res.json(products);
  }catch(error){
    next(error);
  }
});

router.get('/example', (req, res) => {
  res.send('Im a specifc endpoint, not dynamic');
});

router.get('/users', async (re, res, next) => {
  try{
    const users = await service.find();
    res.json(users);
  }catch(error){
    next(error);
  }
})

router.get('/:id', validatorHandler(getProductSchema, 'params'), async (req, res, next)=> {
  try{
    const { id } = req.params;
    const product = await service.product(id);
   res.json(product);
  }catch(err){
    next(err);
  }
});

router.post('/', validatorHandler(createProductSchema, 'body'), async (req, res) => {
  const body = req.body;
  const newProduct = await service.create(body);
  res.status(201).json(newProduct);
});

router.patch('/:id',
validatorHandler(getProductSchema, 'params'),
validatorHandler(updatedProductSchema, 'body'),
async (req, res, next) => {
  try{
    const { id } = req.params
    const body = req.body;
    const category = await service.udpate(id, body);
    res.json(category);
  }catch(err){
    next(err);
  }
});

router.delete('/:id', validatorHandler(getProductSchema, 'params'), async (req, res) => {
  const { id } = req.params;
  const deleteProduct = await service.delete(id);
  res.status(200).json(deleteProduct);
});

module.exports = router;
