import {Component, Injectable, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {Producttype} from "./producttype";
import {ProducttypeService} from "./producttype.service";

@Component({
  selector: 'app-producttype',
  templateUrl: './producttype.component.html',
  styleUrls: ['./producttype.component.css']
})

// @Injectable()
export class ProducttypeComponent implements OnInit {


 //producttype: Producttype[] = [];

 producttypes: any;

  // producttype: Producttype [] = [
  //   {productTypeId:1,typeName:"MB"}
  // ];

constructor(private producttypeService: ProducttypeService ) {
}


  ngOnInit(): void {
    this.producttypeService.getProducttype()
      .subscribe(data =>
      {this.producttypes = data;
      })

  }

}
