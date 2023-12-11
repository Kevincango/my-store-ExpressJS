const os = require('os');
const express = require('express');
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

app.get('/products', (req, res) => {
  res.json([
    {
      name: 'Product 1',
      price: 1000,
    },
    {
      name: 'product 2',
      price: 2000,
    }
  ]);
});

app.get('/products/:id', (req, res)=> {
  const { id } = req.params;
  res.json({
    id,
    name: 'product 2',
    price: 2000,
  });
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


app.listen(port, ()=> {
  console.log(`http://${getLocalExternalIP()}:${port}`);
});


