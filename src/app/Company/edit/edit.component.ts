import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Observable } from "rxjs";
import { MatDialog } from '@angular/material/dialog';
import { ServiceService } from '../ServiceCompany/service.service';
import { Company } from '../../Company/model/Company';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  public formGroup: any;
  titleAlert: string = "This field is required";
  post: any = "";
  total: number = 0;

  constructor(private formBuilder: FormBuilder, private dialog: MatDialog, public service:ServiceService, private router:Router, private activerouter:ActivatedRoute) {
  }
  
  ngOnInit() {
    this.createForm();
    this.setChangeValidate();
    //PRUEBA CAPTURA ID
    this.Edit();

  }
 
  createForm() {
    this.formGroup = this.formBuilder.group({
      email: [
        null,
        [Validators.required, Validators.email],
        this.checkInUseEmail
      ],
      name: [null, Validators.required],
      phone: [
        null,
        [Validators.required, Validators.minLength(8), Validators.maxLength(8)]
       ],
      direction: [
        null,
        [Validators.required, Validators.minLength(10), Validators.maxLength(100)]
      ],
      validate: ""
    });
  }
  
  setChangeValidate() {
    this.formGroup.get("validate").valueChanges.subscribe((validate: any) => {
      if (validate == "1") {
        this.formGroup
          .get("name")
          .setValidators([Validators.required, Validators.minLength(5)]);
        this.titleAlert = "You need to specify at least 5 characters";
      } else {
        this.formGroup.get("name").setValidators(Validators.required);
      }
      this.formGroup.get("name").updateValueAndValidity();
    });
  }
  
  get name() {
    return this.formGroup.get("name") as FormControl;
  }
  

  checkInUseEmail(control:any) {
    // mimic http database access
    let db = ["jack@torchwood.com"];
    return new Observable(observer => {
      setTimeout(() => {
        let result =
          db.indexOf(control.value) !== -1 ? { alreadyInUse: true } : null;
        observer.next(result);
        observer.complete();
      }, 4000);
    });
  }
  
  getErrorEmail() {
    return this.formGroup.get("email").hasError("required")
      ? "Este campo es requerido"
      : this.formGroup.get("email").hasError("pattern")
      ? "Not a valid emailaddress"
      : this.formGroup.get("email").hasError("alreadyInUse")
      ? "This emailaddress is already in use"
      : "";
  }

  getErrorPhone() {
    return this.formGroup.get("phone").hasError("required")
      ? "El número de celular debe ser de 8 digitos": "";
  }
  
  

  onSubmit(put: any) {
    this.service.updateCompany({ "name":put.name , "direction":put.direction, "phone":put.phone, "email":put.email}).subscribe(data => { alert("Empresa Actualizada Exitosamente") ;});
    
  }




  /**ESTRUCTURA DE COMPANY PARA EDITAR*/
  datosCompany:any;

  editarForm = new FormGroup({
    companyId: new FormControl(''),
    name: new FormControl(''),
    direction: new FormControl(''),
    phone: new FormControl(''),
    email: new FormControl('')
  });

  //DATOS DE COMPANY PARA EDITAR
   //Recepcion del "id" de listar.component.ts
  // y uso del metodo getCompanyId de Service
  Edit(){
    let companyId = this.activerouter.snapshot.paramMap.get('id');
    this.service.getCompanyId(companyId).subscribe(data =>{ 
      this.datosCompany=data;

      this.editarForm.setValue({
        'companyId': companyId,
        'name': this.datosCompany.name,
        'direction': this.datosCompany.direction,
        'phone': this.datosCompany.phone,
        'email': this.datosCompany.email

        
      })   
        /** 
      this.editarForm.setValue({
        'companyId': companyId,
        'name': this.datosCompany.name,
        'direction': this.datosCompany.direction,
        'phone': this.datosCompany.phone,
        'email': this.datosCompany.email
        
      })   
      */  
        console.log(this.editarForm.value); 
        console.log(data);
    })
  }


  /*boton que tiene Metodo para Actualizar
  Actualizar(company:any){
    this.service.updateCompany(company)
    .subscribe(data=> {
      this.company=data;
      alert("Compañia Actualizada Exitosamente");
      this.router.navigate(["listar"]);
    })
  }
*/
  Listar(){
    this.router.navigate(["listar"]);
  }

}
