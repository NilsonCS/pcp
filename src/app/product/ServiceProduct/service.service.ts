import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from "rxjs";
import { Product } from '../../../app/product/product';



@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private http:HttpClient) { }

  ProductUrl:string = 'http://localhost:8080/v1/product';


  //conexión con el backend, llamando los productos
  getProducts(): Observable<Product[]>{
    return this.http.get<Product[]>(this.ProductUrl);
    }

  //Get product Id
  //para capturar la fila seleccinada y mostrar en el formulario
  getProductId(id:any):Observable<any>{
    return  this.http.get<Product[]>(this.ProductUrl+"/"+id);
  }

  //CreateCompany
  createProduct(product:any):Observable<any>{
    return this.http.post<any>(this.ProductUrl,product);
  }

  updateProduct(product:any):Observable<any>{
    return this.http.patch<any>(this.ProductUrl,  product );
  }

  deleteProduct(id:number):Observable<Product>{
    return this.http.delete<Product>(this.ProductUrl +"/"+ id, { headers: this.httpHeaders });
  }
 

}
