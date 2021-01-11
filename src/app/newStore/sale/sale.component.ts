import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { SaleServiceService } from '../../newStore/ServiceStore/sale-service.service';

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
  }

  createForm() {
    this.formGroup = this.formBuilder.group({

        card: [null, [Validators.required] ],
        expirationDate: [null, [Validators.required] ],
        securityCode: [null, [Validators.required] ],
      
        // email:[null, [Validators.required, Validators.email] ],
        name: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20) ] ],
        phone:[null, [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(8), Validators.maxLength(8)] ],
        direction:[null,[Validators.required,  Validators.minLength(10), Validators.maxLength(100)] ],
        validate: ""
 
    });
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
