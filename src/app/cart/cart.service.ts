import { Injectable } from '@angular/core';
import { Product } from '../product/product'
@Injectable({
  providedIn: 'root'
})
export class CartService {
  products: Product[] = [];
  total: number = 0;
  constructor() { }

  addProduct(product: Product){
    this.products.push(product);
  }
  clear(){
    this.products = [];
  }
  getProducts():Product[]{
    return this.products;
  }
  getTotal():number{
    this.total = 0;
    for (let product of this.products){
      this.total+=product.unitPrice;
      console.log(product.unitPrice);
    }
    return this.total;
  }
}
