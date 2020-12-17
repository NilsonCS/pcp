import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Company } from '../model/Company';
import { ServiceService } from '../ServiceCompany/service.service';
import swal from "sweetalert2";
import { MatDialog } from '@angular/material/dialog';



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
  constructor(private service:ServiceService ,private router:Router, public dialog: MatDialog, private activerouter:ActivatedRoute) {
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
    //mensaje de advertencia
    swal.fire({
      title: '¿Está seguro?',
      text: `¿Seguro que desea eliminar la empresa ${company.name}?`,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',

    }).then((result) => {
      if (result.value) {

        //llamando al metodo deleteCompany
        this.service.deleteCompany(company.companyId)
        .subscribe( data =>{
            this.company = this.company.filter(co=>co!== company);
              
              //mensaje despues eliminacion exitosa
              swal.fire(
                'Eliminado!',
                `La empresa ${company.name} se ha eliminado exitosamente.`,
                'success'
              );
        });
      }
    });
    
  }


  /**ESTRUCTURA DE info*/
  datosCompany:any;
    editarForm = new FormGroup({
    companyId: new FormControl(''),
    name: new FormControl(''),
    direction: new FormControl(''),
    phone: new FormControl(''),
    email: new FormControl('')
  });

   //Recepcion del "id" de listar.component.ts
  // y uso del metodo getCompanyId de Service
  infoCompany(id:any){
  //  let companyId = this.activerouter.snapshot.paramMap.get('id');
    this.service.getCompanyId(id).subscribe(data =>{ 
          this.datosCompany = data;
          this.editarForm.setValue({
            'companyId': this.datosCompany.companyId,
            'name': this.datosCompany.name,
            'direction': this.datosCompany.direction,
            'phone': this.datosCompany.phone,
            'email': this.datosCompany.email
          })   
             console.log(this.editarForm.value); 
             //console.log(data);
    })
  }


  Listar(){
    this.router.navigate(["listar"]);
  }

  Nuevo(){
    this.router.navigate(["add"]);
  }

   //imagen fondo
   myimage:string = "assets/images/background.jpg";

   //imagen Información
   imgInfo:string = "assets/images/info.png";

   //imagen Información
   imgCompany:string = "assets/images/imgCompany.jpg";




}
