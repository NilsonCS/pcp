import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Company } from '../model/Company';
import { ServiceService } from '../ServiceCompany/service.service';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit {
  title = "Ejemplo";

  //companies: Company[];
  companies: any;
  constructor(private service:ServiceService ,private router:Router) { }

  ngOnInit(): void {
    this.service.getCompany()
    .subscribe(data =>{
      this.companies=data;
    })  
  }  
 /** ngOnInit(): void {
    this.service.getCompany()
    .subscribe(companies =>{
      this.companies = companies;
    })  
  }
*/


  Listar(){
    this.router.navigate(["listar"]);
  }

  Nuevo(){
    this.router.navigate(["add"]);
  }




}
