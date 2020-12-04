import { Component, Input, OnInit } from '@angular/core';
import {Form, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Observable } from "rxjs";
import { MatDialog } from '@angular/material/dialog';
import { ServiceService } from '../serviceUser/service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public formGroup: any;
  titleAlert: string = "This field is required";
  post: any = "";

  constructor(private formBuilder: FormBuilder, public dialog: MatDialog, private serviceService: ServiceService) { }

  ngOnInit(): void {
    this.createForm();
    this.setChangeValidateFirstName();
    this.setChangeValidateLastName();
    this.setChangeValidateUsername();
  }

  createForm(){
    this.formGroup = this.formBuilder.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      username: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(12)]],
      password: [null, [Validators.required, this.checkPassword, Validators.minLength(5), Validators.maxLength(12)]],
      companyId: [null, Validators.required],
      cityId: [null, Validators.required],
      phone: [null, Validators.required],
      email: [null,
        [Validators.required, Validators.email],
        this.checkInUseEmail],
      birthday: [null, Validators.required]
    });
  }

  checkPassword(control:any) {
    let enteredPassword = control.value;
    let passwordCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
    return !passwordCheck.test(enteredPassword) && enteredPassword
      ? { requirements: true }
      : null;
  }
  getErrorPassword() {
    return this.formGroup.get("password").hasError("required")
      ? "Field is required (at least eight characters, one uppercase letter and one number)"
      : this.formGroup.get("password").hasError("requirements")
        ? "Password needs to be at least eight characters, one uppercase letter and one number"
        : "";
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

  setChangeValidateFirstName() {
    this.formGroup.get("validate").valueChanges.subscribe((validate: any) => {
      if (validate == "1") {
        this.formGroup
          .get("firstName")
          .setValidators([Validators.required, Validators.minLength(3)]);
        this.titleAlert = "You need to specify at least 3 characters";
      } else {
        this.formGroup.get("firstName").setValidators(Validators.required);
      }
      this.formGroup.get("firstName").updateValueAndValidity();
    });
  }
  get firstName() {
    return this.formGroup.get("firstName") as FormControl;
  }

  setChangeValidateLastName() {
    this.formGroup.get("validate").valueChanges.subscribe((validate: any) => {
      if (validate == "1") {
        this.formGroup
          .get("lastName")
          .setValidators([Validators.required, Validators.minLength(3)]);
        this.titleAlert = "You need to specify at least 3 characters";
      } else {
        this.formGroup.get("lastName").setValidators(Validators.required);
      }
      this.formGroup.get("lastName").updateValueAndValidity();
    });
  }
  get lastName() {
    return this.formGroup.get("lastName") as FormControl;
  }

  setChangeValidateUsername() {
    this.formGroup.get("validate").valueChanges.subscribe((validate: any) => {
      if (validate == "1") {
        this.formGroup
          .get("username")
          .setValidators([Validators.required, Validators.minLength(3)]);
        this.titleAlert = "You need to specify at least 3 characters";
      } else {
        this.formGroup.get("username").setValidators(Validators.required);
      }
      this.formGroup.get("username").updateValueAndValidity();
    });
  }
  get username() {
    return this.formGroup.get("username") as FormControl;
  }

  startDate = new Date(1990, 0, 1);

  onSubmit(post: any) {
    this.serviceService.createUser({"firstName": post.firstName, "lastName": post.lastName, "username": post.username, "password": post.password, "companyId": post.companyId, "cityId": post.cityId, "phone": post.phone, "email": post.email, "birthday": post.birthday}).subscribe(data => {alert("Registro exitoso");});

  }

}
