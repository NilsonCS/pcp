import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  url: string = 'http://localhost:8080/v1/checkout'
  Url2:string = 'http://localhost:8080/v1/pr';
  constructor(private http: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

   
  post(checkout: any): Observable<any>{
    return this.http.post<any>(this.url, checkout);
  }
  


  //Nuevo post ProductoReserva
  /** 
  post(checkout: any): Observable<any>{
    return this.http.post<any>(this.Url2, checkout);
  }
  */

}
