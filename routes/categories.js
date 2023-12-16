const express = require('express');
const router = express.Router();

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

router.get('/:categoryId/products/:productId', (req, res)=> {
  const { categoryId, productId } = req.params;
  res.json({
    categoryId,
    productId
  });
});



router.get('/', (req, res) => {
  res.json(categories);
});

router.get('/:id', (req, res)=> {
  const { id } = req.params;
  const category = categories.find(c => c.id == id);

  if(category){
    res.json(category);
  }else{
    res.status(404).send(`category with ID ${id} not found`);
  }
})

module.exports = router;
