import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { SaleServiceService } from '../../ServiceStore/sale-service.service';

import swal from "sweetalert2";


@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.css']
})
export class SaleComponent implements OnInit {

  public formGroup: any;
  titleAlert: string = "";
  titleAlertName: string = "";
  titleAlertDirection: string = "";
  titleAlertPhone: string = "";

  constructor(private formBuilder: FormBuilder, private router:Router, private saleService:SaleServiceService) { }

  ngOnInit(): void {
    this.createForm();
    //validaciones
    this.validateName();
    this.validatePhone();
    this.validateDirection();
  }

  createForm() {
    this.formGroup = this.formBuilder.group({

        card: [null, [Validators.required] ],
        expirationDate: [null, [Validators.required] ],
        securityCode: [null, [Validators.required] ],
      
        // email:[null, [Validators.required, Validators.email] ],
        name: [null, [Validators.required, this.validarEspacios, Validators.minLength(4), Validators.maxLength(30) ] ],
        phone:[null, [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(8), Validators.maxLength(8)] ],
        direction:[null,[Validators.required, this.validarEspacios,  Validators.minLength(10), Validators.maxLength(100)] ],
        total: [null, [Validators.required] ],

        validate: ""
 
    });
  }


  //VALIDACIONES
  //name
  public validateName(): any {
    if (this.formGroup.value.name === null ) {
        this.titleAlertName = "Este campo es requerido y solo se aceptan letras.";
      }
  }
  
  //phone
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

  //direction
  public validateDirection(): any {
    if (this.formGroup.value.direction === null ) {
        this.titleAlertDirection="Este campo es requerido, la dirección debe estar comprendida con mínimo 10 caracteres y solo se aceptan letras.";
      }
  }  
  //Validar espacios.
  public validarEspacios(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }
  
  public validateCard(e: any){
    let word  = e.target.value.split(' ').join('');
    let newWord = '';
    for(let i=0; i<word.length ;i++){
      if(i%4==0){
        if(word[i]!=' '){
          newWord+=' ';
        }
      }
    newWord+=word[i]
    }
    e.target.value = newWord.trim();
    console.log(e.target.value); //captando el contenido del campo tarjeta
  }

  public validateCcv(e: any){
    let word  = e.target.value;
    let newWord = '';
    for(let i=0; i<=2; i++){
      newWord+= word[i]
    }
    e.target.value= newWord;
    console.log(e.target.value); //captando el contenido del campo tarjeta
  }


  onSubmit(post: any) {
    this.saleService.createSale({
       "companyId": 1,
       "card":post.card,
       "expirationDate":post.expirationDate ,
       "securityCode":post.securityCode,
       "name":post.name,
       "direction":post.direction,
       "phone":post.phone,
       "total":post.total})
       .subscribe(data => { 
            //mensaje despues de agregar empresa
            swal.fire(
              'Agregado!',
              `Venta exitosa.`,
              'success'
            );
            //alert("La Empresa se guardo exitosamente");
            //this.router.navigate(["listar"]);
        });
    
  }

}
