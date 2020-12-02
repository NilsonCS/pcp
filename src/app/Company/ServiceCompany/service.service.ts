import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Company } from '../model/Company';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  
  constructor(private http:HttpClient) { }

  Url:'http://localhost:8080/api/v1/company';

  getCompany(){
    return this.http.get<Company[]>(this.Url);
  }
}
