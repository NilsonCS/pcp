import {Component, Injectable, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {Producttype} from "./producttype";

@Component({
  selector: 'app-producttype',
  templateUrl: './producttype.component.html',
  styleUrls: ['./producttype.component.css']
})

@Injectable()
export class ProducttypeComponent implements OnInit {

  private urlEndPoint:string = 'http://localhost:8080/v1/producttype/1';

  producttype: Producttype [] = [
    {producttypeId:1,typeName:"MB"}
  ];

  constructor(private http: HttpClient) { }

  // getProducttype(): Observable<Producttype[]>{
  //   return this.http.get(this.urlEndPoint.pipe(map(response) => response as Producttype[])
  // );
 // }

  ngOnInit(): void {
  }

}
