import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Brand} from './modelb/Brand';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});


  constructor(private http: HttpClient) {
  }

  Url: string = 'http://localhost:8080/v1/brand';

  getBrand() {
    return this.http.get<Brand[]>(this.Url);
  }

  createBrand(brand:any):Observable<any>{
    return this.http.post<any>(this.Url,brand);
  }

  getBrandId(id:any):Observable<any>{
    return this.http.get<Brand[]>(this.Url+"/"+id);
  }

  updateBrand(brand:any):Observable<any>{
    return this.http.patch<any>(this.Url, brand);
  }

  deleteBrand(id:number):Observable<Brand>{
    return this.http.delete<Brand>(this.Url+"/"+id,{headers: this.httpHeaders});
  }


}

