import { Injectable } from '@angular/core';
import { Product } from '../product/product'
@Injectable({
  providedIn: 'root'
})
export class CartService {
  product: Product[] = [];
  constructor() { }

  addProduct(product: Product){
    this.product.push(product);
  }
  clear(){
    this.product = [];
  }
  getProducts():Product[]{
    return this.product;
  }
}
