const express = require('express');
const ProductsService = require('../services/product.service');
const service = new ProductsService();
const router = express.Router();


router.get('/', async (req, res) => {
  const products = await service.allProducts();
  res.json(products);
});

router.get('/example', (req, res) => {
  res.send('Im a specifc endpoint, not dynamic');
});

router.get('/:id', async (req, res, next)=> {
  try{
    const { id } = req.params;
    const product = await service.product(id);
    product ? res.status(200).json(product) : res.status(404).json({message: 'product name not found'});
  }catch(err){
    next(err);
  }
});

router.post('/', async (req, res) => {
  const body = req.body;
  const newProduct = await service.create(body);
  res.status(201).json(newProduct);
});

router.patch('/:id', async (req, res) => {
  try{
    const { id } = req.params
    const body = req.body;
    const updateProduct = await service.udpate(id, body);
    res.status(201).json(updateProduct);
  }catch(err){
    res.status(404).send(err.message);
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const deleteProduct = await service.delete(id);
  res.status(200).json(deleteProduct);
});

module.exports = router;
