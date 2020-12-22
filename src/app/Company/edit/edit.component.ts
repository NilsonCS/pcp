import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Observable } from "rxjs";
import { MatDialog } from '@angular/material/dialog';
import { ServiceService } from '../ServiceCompany/service.service';
import { Company } from '../../Company/model/Company';
import swal from "sweetalert2";


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

  titleAlertName: string = "";
  titleAlertDirection: string = "";
  titleAlertPhone: string = "";
  titleAlertEmail: string = "";


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
      email:[null, [Validators.required, Validators.email] ],
      name: [null, [Validators.required, this.validarEspacios,Validators.minLength(3), Validators.maxLength(20) ] ],
      phone:[null, [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(8), Validators.maxLength(8)] ],
      direction:[null,[Validators.required, this.validarEspacios, Validators.minLength(10), Validators.maxLength(100)] ],
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

  //VALIDACIONES
  public validarEspacios(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }

 
  //nuevo name
  public validateName(): any {
    if (this.formGroup.value.name === null ) {
        this.titleAlertName = "Este campo es requerido y debe estar comprendida entre 3 a 20 caracteres.";
      }
  }
  //nuevo direction
  public validateDirection(): any {
    if (this.formGroup.value.direction === null ) {
        this.titleAlertDirection="Este campo es requerido, la dirección debe estar comprendida entre 10 a 100 caracteres.";
      }
  }
  //nuevo phone
  public validatePhone(): any {
    if (this.formGroup.value.phone === null ) {
        this.titleAlertPhone = "El campo Telefóno no puede estar esta vacio y debe tener de 8 digitos.";
      }
  }
  //only number will be add
  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  //nuevo email
  public validateEmail(): any {
    if (this.formGroup.value.email === null ) {
        this.titleAlertEmail = "Este campo no puede estar esta vacio y debe cumplir con el formato __@__mail.com";
      }
  }
  //FIN VALIDACIONES
  

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
    
      this.datosCompany=data;   //pasamos los datos de Company(es decir la data) a datosCompany
      this.editarForm.setValue({
        'companyId': companyId,
        'name': this.datosCompany.name,
        'direction': this.datosCompany.direction,
        'phone': this.datosCompany.phone,
        'email': this.datosCompany.email
      })   
        //console.log(this.editarForm.value); 
        //console.log(data);
    })
  }

  //guardamoa los datos actualizados
  company:any;
  actualizarCompany(company:any){
    this.service.updateCompany(company)
    .subscribe( data =>{
      this.company = data;

        //mensaje despues de la actualización exitosa
        swal.fire(
          'Actualizado!',
          `La empresa ${company.name} se ha actualizado exitosamente.`,
          'success'
        );
        
        //alert("Compañia Actualizada Exitosamente");
        this.router.navigate(["listar"]);
        console.log(data);
    })
  }


 
  Listar(){
    this.router.navigate(["listar"]);
  }

   //imagen
   myimage:string = "assets/images/background.jpg";


}
