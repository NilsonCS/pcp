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
  //GetCompany para llamar lista de companies
  companies: any;
  constructor(private service:ServiceService ,private router:Router) { }

  ngOnInit(): void {
    this.service.getCompany()
    .subscribe(data =>{
      this.companies=data;
    })  
  }  

//PRUEBA
//metodo relacionado con Listar.component.html
//Envio del "id" de la fila seleccionada
  editCompany(id:any){
    this.router.navigate(["edit", id]);
  }

  Listar(){
    this.router.navigate(["listar"]);
  }

  Nuevo(){
    this.router.navigate(["add"]);
  }




}
