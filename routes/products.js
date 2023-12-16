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

const productsFilter = generateRandomProducts(10);
//console.log(productsFilter);

router.get('/example', (req, res) => {
  res.send('Im a specifc endpoint, not dynamic');
});

router.get('/:name', (req, res)=> {
  const { name } = req.params;
  const product = productsFilter.find(p => p.productName === name);
  if(product){
    res.json(product);
  }else{
    res.status(404).send('product name not found');
  }
});

module.exports = router;
