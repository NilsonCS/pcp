import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Sale } from '../../newStore/sale/model/Sale';

import { Product } from '../../product/product'; 

@Injectable({
  providedIn: 'root'
})
export class SaleServiceService {

  //products:Product[]=[];
  sale:Sale[]=[];
  total: number = 0;
  constructor(private http:HttpClient) { }

  Url:string = 'http://localhost:8080/v1/sale';
  ProductUrl:string = 'http://localhost:8080/v1/sale';

   //CreateSale
   createSale(sale:any):Observable<any>{
    return this.http.post<any>(this.Url,sale);
  }

  
  /**obtener el precio total de los productos
  getTotal():number{
    this.total = 0;
    for (let product of this.products){
      this.total+=product.unitPrice;
      console.log(product.unitPrice);
    }
    return this.total;
  }
*/
  
}
