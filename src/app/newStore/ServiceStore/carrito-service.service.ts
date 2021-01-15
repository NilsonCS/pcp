import { Injectable } from '@angular/core';
import { Product } from '../../product/product'; 

@Injectable({
  providedIn: 'root'
})

export class CarritoServiceService {

  products:Product[]=[];
  //cantidad de productos
  productsCantidad:any[] = [];
  total: number = 0;
  constructor() { }

  // CANTIDAD DE PRODUCTO/////////////////////////////////////////////////////////

  //añadir productos
  addProduct(product: Product){
   // this.products.push(product);
   let posicion = this.verificarProductoDuplicado(product);
      if(posicion == -1){
        this.productsCantidad.push({
          producto: product,
          cantidad: 1
          }) 
      }else{
        this.productsCantidad[posicion].cantidad+=1
      }
     
  }

  //obteniendo cantidad para el carrito
  getProductsCantidad():any[]{
    return this.productsCantidad;
  }

  //añadir Producto Duplicados
  verificarProductoDuplicado(product: Product){
      let posicion = -1;
      for(let i=0; i<this.productsCantidad.length; i++){
         // let productoRegistrado:any = this.productsCantidad[i]["producto"];
          if( this.productsCantidad[i].producto.productId == product.productId){
            posicion = i;
            break;    
          }
      }
      return posicion;
  }

///////////////////////////////////////////////////////////
  //obteniendo productos para el carrito
  getProducts():Product[]{
    return this.products;
  }


  //Eliminar producto
  deleteProduct(product: Product){
    let temp:any[]=[];
    for (let x of this.productsCantidad){
      if (x.producto.productId != product.productId){
        temp.push(x);
      }
    }
    this.productsCantidad = temp;
  }

  //obtener el precio total de los productos
  getTotal():number{
    this.total = 0;
    for (let product of this.productsCantidad){
      this.total+=product.producto.unitPrice * product.cantidad;
      console.log(product.unitPrice);
    }
    return this.total;
  }

  
}
