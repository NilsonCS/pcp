import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from "rxjs";
import { Injectable } from '@angular/core';
import { Company } from '../model/Company';
import { Product } from '../../../app/product/product';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private http:HttpClient) { }


  Url:string = 'http://localhost:8080/v1/company';
  ProductUrl:string = 'http://localhost:8080/v1/product';
  getCompany(){
  return this.http.get<Company[]>(this.Url);
  }

  //CreateCompany
  createCompany(company:any):Observable<any>{
    return this.http.post<any>(this.Url,company);
  }

  //Get company Id
  //para capturar la fila seleccinada y mostrar en el formulario
  getCompanyId(id:any):Observable<any>{
    return  this.http.get<Company[]>(this.Url+"/"+id);
  }

  //Get product Id
  //para capturar la fila seleccinada y mostrar en el formulario
  getProductoId(id:any):Observable<any>{
    return  this.http.get<Product[]>(this.ProductUrl+"/"+id);
  }
  //Get Products
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.ProductUrl);
  }

  //nuevo
   //update Company 
  //Para guardar los datos actualizados
  updateCompany(company:any):Observable<any>{
    return this.http.patch<any>(this.Url,  company );
  }


  deleteCompany(id:number):Observable<Company>{
    return this.http.delete<Company>(this.Url +"/"+ id, { headers: this.httpHeaders });
  }



}
