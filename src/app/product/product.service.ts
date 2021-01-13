import { Injectable } from '@angular/core';
import { Product } from './product';
import {Observable} from "rxjs";
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  url: string = 'http://localhost:8080/v1/product';
  last: any ;
  constructor(private http: HttpClient) { }

  //conexión con el backend, llamando los productos
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.url);
  }
  //obtiene el detalle del producto
  setLast(product: Product){
      this.last = product;
  }
  getLast(): Product{
    return this.last;
  }

  //CreateProduct
  createProduct(product:any):Observable<any>{
    return this.http.post<any>(this.url,product);
  }

  
  
}
