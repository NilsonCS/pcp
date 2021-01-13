import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Checkout } from '../checkout';


@Injectable({
  providedIn: 'root'
})
export class ServiceCheckoutService {

  constructor(private http:HttpClient) { }

  Url:string = 'http://localhost:8080/v1/checkout';

  getCheckout(){
    return this.http.get<Checkout[]>(this.Url);
    }
}
