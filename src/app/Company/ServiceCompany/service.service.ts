import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs";
import { Injectable } from '@angular/core';
import { Company } from '../model/Company';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  constructor(private http:HttpClient) { }

  /*getCompany(): Observable<Company[]>{
    // @ts-ignore
    return this.http.get(this.urlEndPoint).pipe( map(response => response as Company[])
    );
  }*/

Url:string = 'http://localhost:8080/v1/company/1';
  getCompany(){
  return this.http.get<Company>(this.Url);
  }


}
