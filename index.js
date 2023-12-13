const express = require('express');
const os = require('os');
const { faker } = require('@faker-js/faker');
const app = express();
const port = 3000;

function getLocalExternalIP() {
  const networkInterfaces = os.networkInterfaces();
  for (let interface in networkInterfaces) {
    for (let interfaceInfo of networkInterfaces[interface]) {
      if (interfaceInfo.family === 'IPv4' && !interfaceInfo.internal) {
        return interfaceInfo.address;
      }
    }
  }
  return null;
}


app.get('/', (req, res) => {
  res.send('Hello, my first server on Express');
});

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

app.get('/products', (req, res) => {
  const { size } = req.query;
  const products = generateRandomProducts(size);
  res.json(products);
});

const productsFilter = generateRandomProducts(10);
//console.log(productsFilter);

app.get('/products/example', (req, res) => {
  res.send('Im a specifc endpoint, not dynamic');
});

app.get('/products/:name', (req, res)=> {
  const { name } = req.params;
  const product = productsFilter.find(p => p.productName === name);
  if(product){
    res.json(product);
  }else{
    res.status(404).send('product name not found');
  }
});

app.get('/categories/:categoryId/products/:productId', (req, res)=> {
  const { categoryId, productId } = req.params;
  res.json({
    categoryId,
    productId
  });
});

const categories = [
  {
    id: 1,
    name: 'electronics'
  },
  {
    id: 2,
    name: 'clothes'
  },
  {
    id: 3,
    name: 'healthcare'
  }
];

app.get('/categories', (req, res) => {
  res.json(categories);
});

app.get('/categories/:id', (req, res)=> {
  const { id } = req.params;
  const category = categories.find(c => c.id == id);

  if(category){
    res.json(category);
  }else{
    res.status(404).send(`category with ID ${id} not found`);
  }
})

app.get('/users', (req, res) => {
  const { limit, offset } = req.query;
  if(limit && offset){
    res.json({
      limit,
      offset,
    });
  }else{
    res.send('There are not params');
  }
})




app.listen(port, ()=> {
  console.log(`http://${getLocalExternalIP()}:${port}`);
});


