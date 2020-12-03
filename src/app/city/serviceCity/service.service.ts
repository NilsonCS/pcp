import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs";
import { Injectable } from '@angular/core';
import { City } from '../model/city';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  constructor(private http: HttpClient) { }

  Url:string = 'http://localhost:8080/v1/city/';
  getCity(){
  return this.http.get<City[]>(this.Url);
  }


}
