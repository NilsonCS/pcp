import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Producttype} from './producttype';
import {catchError, map} from 'rxjs/operators';
import swal from 'sweetalert2';
import {Router} from '@angular/router';
import {Brand} from '../brand/modelb/Brand';

@Injectable({
  providedIn: 'root'
})
export class ProducttypeService {
   urlEndPoint = 'http://localhost:8080/v1/producttype/';
   urlEndPoint2 = 'http://localhost:8080/v1/producttype/';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private http: HttpClient, private router: Router) { }

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

        if (e.status === 400) {
          return throwError(e);
        }

        console.error(e.error.mensaje);
        return throwError(e);
      })
    );
  }

  getProductTypee(productTypeId: any): Observable<Producttype>{
    return this.http.get<Producttype>(`${this.urlEndPoint}/${productTypeId}`).pipe(
      catchError(e => {
        this.router.navigate(['/producttype/form']);
        console.error(e.error.mensaje);
        swal.fire('Error al editar', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  getProductTypeU(productTypeId: any): Observable<Producttype> {
    return this.http.get<Producttype>(`${this.urlEndPoint}/${productTypeId}`).pipe(
      catchError(e => {
        this.router.navigate(['/producttype']);
        console.error(e.error.mensaje);
        swal.fire('Error al editar', e.error.mensaje, 'error');
        return throwError(e);
        console.log('ACA el prodcut' + productTypeId);
      })
    );
  }

   update(productType: any): Observable<any> {
     return this.http.patch<any>(
       this.urlEndPoint, productType);

  //  return this.http.patch<Producttype>(`${this.urlEndPoint}${productType.productTypeId}`, productType, { headers: this.httpHeaders }).pipe(
   // return this.http.patch<any>(`${this.urlEndPoint2}/${productType.productTypeId}`, productType, { headers: this.httpHeaders }).pipe(
     catchError(e => {

        if (e.status === 400) {
          return throwError(e);
        }

        console.error(e.error.mensaje);
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      });
  }
  delete(id: number): Observable<Producttype> {
    return this.http.delete<Producttype>(`${this.urlEndPoint}/${id}`, { headers: this.httpHeaders }).pipe(
      catchError(e => {
        console.error(e.error.mensaje);
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }
  getProductTypeId(id:any):Observable<any>{
    return this.http.get<Producttype[]>(this.urlEndPoint+"/"+id);
  }

}
