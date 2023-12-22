const express = require('express');
const ProductsService = require('../services/product.service');
const service = new ProductsService();
const router = express.Router();


router.get('/', (req, res) => {
  const products = service.allProducts();
  res.json(products);
});

router.get('/example', (req, res) => {
  res.send('Im a specifc endpoint, not dynamic');
});

router.get('/:id', (req, res)=> {
  const { id } = req.params;
  const product = service.product(id);
  product ? res.status(200).json(product) : res.status(404).json({message: 'product name not found'});
});

router.post('/', (req, res) => {
  const body = req.body;
  const newProduct = service.create(body);
  res.status(201).json(newProduct);
});

router.patch('/:id', (req, res) => {
  const { id } = req.params
  const body = req.body;
  const updateProduct = service.udpate(id, body);
  res.status(201).json(updateProduct);
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const deleteProduct = service.delete(id);
  res.status(200).json(deleteProduct);
});

module.exports = router;