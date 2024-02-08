const express = require('express');
const router = express.Router();
const validatorHandler = require('../middlewares/validatorHandler');
const { getOrderSchema, createOrderScheam} = require('../schemes/order.schema');
const OrderService = require('../services/order.service');
const service = new OrderService();

router.post('/', validatorHandler(createOrderScheam, 'body'), async (req,res,next) => {
  try{
    const body = req.body;
    res.status(201).json(await service.create(body));
  }catch(error){
    next(error);
  }
});

router.get('/', async (req,res,next) => {
  try {
    res.json(await service.find());
  }catch(error){
    next(error);
  }
})

router.get('/:id', validatorHandler(getOrderSchema, 'params'), async (req,res,next) => {
  try{
    const { id } = req.params;
    res.json(await service.findOne(id));
  }catch(error){
    next(error);
  }
});

module.exports = router;
