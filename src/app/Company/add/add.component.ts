import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Observable } from "rxjs";
import { MatDialog } from '@angular/material/dialog';
import { ServiceService } from '../ServiceCompany/service.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  public formGroup: any;
  titleAlert: string = "This field is required";
  post: any = "";
  total: number = 0;
  
  constructor(private formBuilder: FormBuilder, private dialog: MatDialog, public service:ServiceService, private router:Router) {}
  
  ngOnInit() {
    this.createForm();
    this.setChangeValidate();
    
  }
 
  createForm() {
    this.formGroup = this.formBuilder.group({
      email: [
        null,
        [Validators.required, Validators.email],
        this.checkInUseEmail
      ],
      name: [null, Validators.required],
      password: [null, [Validators.required, this.checkPassword]],
      description: [
        null,
        [Validators.required, Validators.minLength(5), Validators.maxLength(100)]
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
  
  checkPassword(control:any) {
    let enteredPassword = control.value;
    let passwordCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
    return !passwordCheck.test(enteredPassword) && enteredPassword
      ? { requirements: true }
      : null;
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
      ? "Field is required"
      : this.formGroup.get("email").hasError("pattern")
      ? "Not a valid emailaddress"
      : this.formGroup.get("email").hasError("alreadyInUse")
      ? "This emailaddress is already in use"
      : "";
  }
  
  getErrorPassword() {
    return this.formGroup.get("password").hasError("required")
      ? "Field is required (at least eight characters, one uppercase letter and one number)"
      : this.formGroup.get("password").hasError("requirements")
      ? "Password needs to be at least eight characters, one uppercase letter and one number"
      : "";
  }
  
  onSubmit(post: any) {
    this.service.createCompany({"companyId":post.companyId ,"name":post.nombre , "direction":post.direction, "phone":post.phone, "email":post.email}).subscribe(data => { alert("Guardado con exito!!!") ;});
    
  }








  Listar(){
    this.router.navigate(["listar"]);
  }

  Nuevo(){
    this.router.navigate(["add"]);
  }

}
