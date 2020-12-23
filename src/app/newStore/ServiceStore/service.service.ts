import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from "rxjs";
import { Product } from '../../product/product';



@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  url: string = 'http://localhost:8080/v1/product';
  last: any ;

  constructor(private http:HttpClient) { }




}
