const { faker } = require('@faker-js/faker');

class ProductsService{

  constructor(){
    this.products = [];
    this.generate();
  }
  generate(){
    const limit = 10;
    for(let i = 0; i < limit; i++){
    this.products.push({
    id: faker.string.uuid(),
    productName: faker.commerce.productName(),
    price: parseInt(faker.commerce.price()),
    image: faker.image.url(),
    });
  }
  }
  create(){

  }
  allProducts(){
    return this.products;
  }
  product(id){
    return this.products.find(p => p.id === id);
  }
  delete(){

  }
}

module.exports = ProductsService;
