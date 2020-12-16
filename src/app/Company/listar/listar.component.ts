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
  company:Company[];
  constructor(private service:ServiceService ,private router:Router) {
    this.company = [];
   }

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

  //Boton eliminar
  eliminar(company:Company){
    this.service.deleteCompany(company.companyId)
    .subscribe( data =>{
      this.company = this.company.filter(co=>co!== company);
      alert("Compañia Eliminada Exitosamente");
      console.log(data);
    })
  }



  Listar(){
    this.router.navigate(["listar"]);
  }

  Nuevo(){
    this.router.navigate(["add"]);
  }




}
