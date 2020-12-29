import { Injectable } from '@angular/core';
import { Product } from '../../product/product'; 

@Injectable({
  providedIn: 'root'
})
export class CarritoServiceService {

  products:Product[]=[];
  constructor() { }


  addProduct(product: Product){
    this.products.push(product);
  }
}
