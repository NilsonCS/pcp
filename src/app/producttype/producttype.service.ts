import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Producttype} from "./producttype";
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProducttypeService {
   urlEndPoint:string = 'http://localhost:8080/v1/producttype/';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private http: HttpClient) { }

// getProducttype(): Observable<Producttype[]>{
//     // @ts-ignore
//   return this.http.get(this.urlEndPoint).pipe( map(response => response as Producttype[])
//   );

getProducttype(){
    return this.http.get<Producttype[]>(this.urlEndPoint);
  }

  create(producttype: Producttype): Observable<Producttype> {
    return this.http.post(this.urlEndPoint, producttype, { headers: this.httpHeaders }).pipe(
      map((response: any) => response.producttype as Producttype),
      catchError(e => {

        if (e.status == 400) {
          return throwError(e);
        }

        console.error(e.error.mensaje);
        return throwError(e);
      })
    );
  }
}
