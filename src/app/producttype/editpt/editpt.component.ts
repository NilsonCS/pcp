import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {ProducttypeService} from '../../producttype/producttype.service';
import {ActivatedRoute, Router} from '@angular/router';
import swal from "sweetalert2";

@Component({
  selector: 'app-editpt',
  templateUrl: './editpt.component.html',
  styleUrls: ['./editpt.component.css']
})
export class EditptComponent implements OnInit {

  public formGroup: any;
  titleAlert = 'This field is required';
  post: any = '';
  total: number = 0;

  constructor(private formBuilder: FormBuilder, private dialog: MatDialog, public service: ProducttypeService, private router: Router, private activerouter: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.createForm();
    this.Edit();
  }
  createForm() {
    this.formGroup = this.formBuilder.group({
      typeName: [null, Validators.required]
    });
  }






  // setChangeValidate() {
  //   this.formGroup.get('validate').valueChanges.subscribe((validate: any) => {
  //     if (validate == '1') {
  //       this.formGroup
  //         .get('name')
  //         .setValidators([Validators.required, Validators.minLength(5)]);
  //       this.titleAlert = 'You need to specify at least 5 characters';
  //     } else {
  //       this.formGroup.get('name').setValidators(Validators.required);
  //     }
  //     this.formGroup.get('name').updateValueAndValidity();
  //   });
  // }
  get typeName() {
    return this.formGroup.get('typeName') as FormControl;
  }


  datosProducttype: any;

  editarForm = new FormGroup({
    productTypeId: new FormControl(''),
    typeName: new FormControl(''),
  });


  Edit(){
    let productTypeId = this.activerouter.snapshot.paramMap.get('id');
    this.service.getProducttypeId(productTypeId).subscribe(data => {
      console.log(productTypeId);

      this.datosProducttype = data;
      this.editarForm.setValue({
        'productTypeId': productTypeId,
        'typeName': this.datosProducttype.typeName,
      });
      console.log(productTypeId);

    });
  }
  producttype:any;
  actualizarProductType(producttype: any){
    this.service.updateProducttype(producttype)
      .subscribe( data => {
        this.producttype = data;
        swal.fire(
          'Actualizado!',
          `El tipo de producto ${producttype.typeName} se ha actualizado exitosamente.`,
          'success'
        );
        this.router.navigate(['listarpt']);
        console.log(data);
      });
  }



  Listar(){
    this.router.navigate(['listarpt']);
  }



}
