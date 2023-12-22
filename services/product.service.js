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
  create(data){
    const newProduct = {
      id: faker.string.uuid(),
      ...data,
    };
    return newProduct;
  }
  udpate(id, changes){
    const index = this.products.findIndex(p => p.id === id);
    if(index === -1){
      throw new Error('product not found!');
    }
    const originalProduct = this.products[index];
    this.products[index] = {
      ...originalProduct,
      ...changes,
    };
    return this.products[index];
  }
  allProducts(){
    return this.products;
  }
  product(id){
    return this.products.find(p => p.id === id);
  }
  delete(id){
    const index = this.products.findIndex(p => p.id === id);
    if(index === -1){
      throw new Error('Product not found!');
    }
    return {
      message: 'Delete product succesful',
      data: this.products.splice(index, 1),
  }
  }
}

module.exports = ProductsService;
