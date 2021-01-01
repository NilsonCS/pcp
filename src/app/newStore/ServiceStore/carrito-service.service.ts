import { Injectable } from '@angular/core';
import { Product } from '../../product/product'; 

@Injectable({
  providedIn: 'root'
})
export class CarritoServiceService {

  products:Product[]=[];
  constructor() { }

  //añadir productos
  addProduct(product: Product){
    this.products.push(product);
  }

  //obteniendo productos para el carrito
  getProducts():Product[]{
    return this.products;
  }
}
