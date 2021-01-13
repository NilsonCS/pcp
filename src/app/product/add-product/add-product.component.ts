import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Observable } from "rxjs";
import { MatDialog } from '@angular/material/dialog';
import { ProductService } from '../../product/product.service';
import swal from "sweetalert2";

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  public formGroup: any;
  titleAlert: string = "This field is required";
  post: any = "";
  total: number = 0;

  titleAlertName: string = "";
  titleAlertDirection: string = "";
  titleAlertPhone: string = "";
  titleAlertEmail: string = "";
  
  constructor(private formBuilder: FormBuilder, private dialog: MatDialog, public service:ProductService, private router:Router) {}
  
  ngOnInit() {
    this.createForm();

    this.validateName();
    this.validateDirection();
    this.validatePhone();
    
  }
 
  createForm() {
    this.formGroup = this.formBuilder.group({

      productName: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20) ] ],
      productDescription: [null,[Validators.required, this.validarEspacios, Validators.minLength(10), Validators.maxLength(100)] ],
      model: [null, Validators.required],
      stock: [null, [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(1)] ],
      unitPrice: [null, Validators.required],
      img: [null, Validators.required],
      validate: ""
    });
  }
  
  

  
  //validacion
  public validarEspacios(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }

   //nuevo name
   public validateName(): any {
    if (this.formGroup.value.productName === null ) {
        this.titleAlertName = "Este campo es requerido y debe estar comprendida entre 3 a 20 caracteres.";
      }
  }
  //nuevo descripcion
  public validateDirection(): any {
    if (this.formGroup.value.direction === null ) {
        this.titleAlertDirection="Este campo es requerido, la descripción debe estar comprendida entre 10 a 100 caracteres.";
      }
  }
  //nuevo phone
  public validatePhone(): any {
    if (this.formGroup.value.phone === null ) {
        this.titleAlertPhone = "Este campo  no puede estar esta vacio .";
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
  //fin validacion












  onSubmit(post: any) {
    this.service.createProduct({
        "productName":post.productName ,
        "model":post.model,
        "productDescription":post.productDescription,
        "stock":post.stock,
        "weight":5,
        "unitPrice":post.unitPrice,
        "currency":1,
        "img":post.img,
        "companyId":2,
        "productTypeId":1,
        "cityId":1 ,
        "brandId":1})
    .subscribe(data => { 
           //mensaje despues de agregar empresa
           swal.fire(
            'Agregado!',
            `El Producto se ha agregado exitosamente.`,
            'success'
          );
          this.router.navigate(["listarPoduct"]);
       ;});
  }



  Listar(){
    this.router.navigate(["listarProduct"]);
  }


  //imagen
  myimage:string = "assets/images/desk.jpg";



}
