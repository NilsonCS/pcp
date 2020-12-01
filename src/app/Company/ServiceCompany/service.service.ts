import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Company } from '../model/Company';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  
  constructor(private http:HttpClient) { }

  Url:'http://localhost:8080/v1/company';

  get(){
    return this.http.get<Company[]>(this.Url);
  }
}
