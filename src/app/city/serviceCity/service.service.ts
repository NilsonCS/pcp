import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from "rxjs";
import { Injectable } from '@angular/core';
import { City } from '../model/city';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  Url: string = 'http://localhost:8080/v1/city/';
  constructor(private http: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  createCity(city: any): Observable<any>{
    return this.http.post<any>(this.Url, city);
  }
  getCity(){
  return this.http.get<City[]>(this.Url);
  }
}
