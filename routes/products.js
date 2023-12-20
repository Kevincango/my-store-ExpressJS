const express = require('express');
const { faker } = require('@faker-js/faker');

const router = express.Router();

function generateRandomProducts(limit = 10){
  const products = [];
  for(let i = 0; i < limit; i++){
    products.push({
    productName: faker.commerce.productName(),
    price: parseInt(faker.commerce.price()),
    image: faker.image.url(),
    });
  }
  return products;
}

router.get('/', (req, res) => {
  const { size } = req.query;
  const products = generateRandomProducts(size);
  res.json(products);
});

const productsFilter = generateRandomProducts();
console.log(productsFilter);

router.get('/example', (req, res) => {
  res.send('Im a specifc endpoint, not dynamic');
});

router.get('/:name', (req, res)=> {
  const { name } = req.params;
  const product = productsFilter.find(p => p.productName === name);
  if(product){
    res.status(200).json(product);
  }else{
    res.status(404).json({
      message: 'product name not found'
    });
  }
});

router.post('/', (req, res) => {
  const body = req.body;
  res.status(201).json({
    message: 'created',
    data: body
  });
});

router.patch('/:id', (req, res) => {
  const { id } = req.params
  const body = req.body;
  res.status(201).json({
    message: 'updated',
    data: body,
    id,
  })
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  res.status(200).json({
    message: 'deleted',
    id,
  });
});

module.exports = router;
