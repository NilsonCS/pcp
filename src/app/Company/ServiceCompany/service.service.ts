import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs";
import { Injectable } from '@angular/core';
import { Company } from '../model/Company';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  constructor(private http:HttpClient) { }

  Url:string = 'http://localhost:8080/v1/company/';
  getCompany(){
  return this.http.get<Company[]>(this.Url);
  }

  //CreateCompany
 // createCompany(company:Company){
 //   return this.http.post<Company>(this.Url,company);
  //c}


}
