import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from "rxjs";
import { Injectable } from '@angular/core';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  constructor(private http: HttpClient) { }
  Url: string = 'http://localhost:8080/v1/user/register';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  createUser(user: any): Observable<any>{
    return this.http.post<any>(this.Url, user);
  }




}
