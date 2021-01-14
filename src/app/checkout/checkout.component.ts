import { Component, Input, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Observable } from "rxjs";
import { CartService } from '../cart/cart.service';
import { MatDialog } from '@angular/material/dialog';
import { CheckoutService } from './checkout.service';
import { CarritoServiceService } from '../newStore/ServiceStore/carrito-service.service';
import swal from "sweetalert2";
import { Router } from '@angular/router';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
public formGroup: any;
titleAlert: string = "This field is required";
post: any = "";
total: number = 0;
date: any;
//validaciones
titleAlertName: string = "";
titleAlertEmail: string = "";

constructor(private formBuilder: FormBuilder, public cartService: CartService,
            public carritoService: CarritoServiceService, private dialog: MatDialog,
            private checkoutService: CheckoutService, private router:Router) {}

ngOnInit() {
  this.createForm();
  this.setChangeValidate();
  this.getTotal();
  this.getDate();

  this.validateName();
  this.validateEmail();
}
/**
getTotal(){
  this.total= this.cartService.getTotal();
}
 */
//Costo total de los productos
getTotal(){
  this.total= this.carritoService.getTotal();
}

//fecha
getDate(){
  this.date = new Date();
}

createForm() {
  this.formGroup = this.formBuilder.group({
    name: [null, [Validators.required, this.validarEspacios,Validators.minLength(3), Validators.maxLength(50) ]],
    email: [null, [Validators.required, Validators.email] ],
   //date: [null, Validators.required],

    //email: [null, [Validators.required, Validators.email],this.checkInUseEmail],
    //password: [null, [Validators.required, this.checkPassword]],
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

//validaciones
  //nuevo name
  public validateName(): any {
    if (this.formGroup.value.name === null ) {
        this.titleAlertName = "Este campo es requerido.";
      }
  }
  //nuevo email
  public validateEmail(): any {
    if (this.formGroup.value.email === null ) {
        this.titleAlertEmail = "Este campo no puede estar vacio y debe cumplir con el formato __@__mail.com";
      }
  }

  //validacion de espacios
  public validarEspacios(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }


onSubmit(post: any) {
  this.checkoutService.post({"cartId":1 ,"paymentDetailsId": 1,
                             "contact":post.name,
                             "address":post.email,
                             "date":this.date,
                             "total":this.total })
                             .subscribe(data => {
                                this.post = "Guardado con exito!!!";
                                  //mensaje despues de guardar el checkout
                                  swal.fire(
                                    'Agregado!',
                                    `Reserva exitosa, desde hoy tiene 10 días para finalizar la compra.`,
                                    'success'
                                  );

                                  this.close();
                                  this.router.navigate(["listarStore"]);
                            
                              });
                              //this.formGroup.reset();


}

close(){
  this.dialog.closeAll();
}
}
