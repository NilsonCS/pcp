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


  producttype: Producttype [] = [
    {producttypeId:1,typeName:"MB"}
  ];




  ngOnInit(): void {
  }

}
