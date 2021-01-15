import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from "rxjs";
import { Checkout } from '../checkout';


@Injectable({
  providedIn: 'root'
})
export class ServiceCheckoutService {

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http:HttpClient) { }

  Url:string = 'http://localhost:8080/v1/checkout';
  Url2:string = 'http://localhost:8080/v1/pr';

  //metodo para obtener la lista de reservas
  getCheckout(){
    return this.http.get<Checkout[]>(this.Url);
  }

  //metodo para obtener la lista productoReserva
  getPr(){
    return this.http.get<Checkout[]>(this.Url2);
  }

  //metodo para eliminar reservas
  deleteCheckout(id:number):Observable<Checkout>{
    return this.http.delete<Checkout>(this.Url +"/"+ id, { headers: this.httpHeaders });
  }
}
