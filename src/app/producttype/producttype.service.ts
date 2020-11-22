import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Producttype} from "./producttype";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ProducttypeService {
  private urlEndPoint:string = 'http://localhost:8080/v1/producttype/1';
  constructor(private http: HttpClient) { }

getProducttype(): Observable<Producttype[]>{
    // @ts-ignore
  return this.http.get(this.urlEndPoint.pipe(map(response) => response as Producttype[])
  )
  }
}
