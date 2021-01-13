import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Producttype} from './producttype';
import {catchError, map} from 'rxjs/operators';
import swal from 'sweetalert2';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProducttypeService {
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});


  constructor(private http: HttpClient) {
  }

  Url: string = 'http://localhost:8080/v1/producttype';

  getProducttype() {
    return this.http.get<Producttype[]>(this.Url);
  }

  createProductType(producttype:any):Observable<any>{
    return this.http.post<any>(this.Url, producttype);
  }

  getProducttypeId(id:any):Observable<any>{
    return this.http.get<Producttype[]>(this.Url+"/"+id);
  }

  updateProducttype(producttype:any):Observable<any>{
    return this.http.patch<any>(this.Url, producttype);
  }

  deleteProducttype(id:number):Observable<Producttype>{
    return this.http.delete<Producttype>(this.Url+"/"+id,{headers: this.httpHeaders});
  }


}

