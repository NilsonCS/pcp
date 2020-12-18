import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Observable } from "rxjs";
import { MatDialog } from '@angular/material/dialog';
import { ServiceService } from '../ServiceCompany/service.service';
import swal from "sweetalert2";
import { getNumberOfCurrencyDigits } from '@angular/common';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  public formGroup: any;
  titleAlert: string = "";
  titleAlertName: string = "";
  titleAlertDirection: string = "";
  titleAlertPhone: string = "";
  titleAlertEmail: string = "";

  post: any = "";
  total: number = 0;
  
  constructor(private formBuilder: FormBuilder, private dialog: MatDialog, public service:ServiceService, private router:Router) {}
  
  ngOnInit() {
    this.createForm();
  //  this.setChangeValidate();
    this.validateName();
    this.validateDirection();
    this.validatePhone();
    this.validateEmail();

  }
 
  createForm() {
    this.formGroup = this.formBuilder.group({

        email:[null, [Validators.required, Validators.email], this.checkInUseEmail ],
        name: [null, Validators.required],
        phone:[null, [Validators.required,Validators.pattern("^[0-9]*$"), Validators.minLength(8), Validators.maxLength(8)] ],
        direction:[null, [Validators.required, Validators.minLength(10), Validators.maxLength(100)] ],
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

  //nuevo name
  public validateName(): any {
    if (this.formGroup.value.name === null ) {
        this.titleAlertName = "El campo Nombre no puede estar esta vacio.";
      }
  }
  //nuevo direction
  public validateDirection(): any {
    if (this.formGroup.value.direction === null ) {
        this.titleAlertDirection="Este campo es requerido, la dirección debe estar comprendida entre 10 y 100 caracteres.";
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
  


  
  onSubmit(post: any) {
    this.service.createCompany({
       "name":post.name ,
       "direction":post.direction,
       "phone":post.phone,
       "email":post.email})
       .subscribe(data => { 
            //mensaje despues de agregar empresa
            swal.fire(
              'Agregado!',
              `La empresa se ha agregado exitosamente.`,
              'success'
            );
            //alert("La Empresa se guardo exitosamente");
            this.router.navigate(["listar"]);
        });
    
  }






  Listar(){
    this.router.navigate(["listar"]);
  }

  Nuevo(){
    this.router.navigate(["add"]);
  }

  //imagen
  myimage:string = "assets/images/background.jpg";





}
