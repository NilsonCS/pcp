import { Component, OnInit } from '@angular/core';
import {Producttype} from './producttype';
import {ProducttypeService} from './producttype.service';
import {ActivatedRoute, Router} from '@angular/router';
import swal from 'sweetalert2';
import Swal from 'sweetalert2';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {
  private locator = (p: Producttype, productTypeId: number) => p.productTypeId === productTypeId;

  public formGroup: any;
  titleAlert = 'This field is required';
  post: any = '';
  total: number = 0;
  // @ts-ignore
  producttype: Producttype = new Producttype();
  titulo = 'Crear nuevo tipo de producto';
 // errores: string[];
  constructor(private productTypeService: ProducttypeService,
              private router: Router,
              private activatedRoute: ActivatedRoute,private formBuilder: FormBuilder,
  private activerouter: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.createForm();
    this.update();
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      name: [null, Validators.required]
    });
  }

  get typeName() {
    return this.formGroup.get('typeName') as FormControl;
  }
  public create(): void {
    this.productTypeService.create(this.producttype)
      .subscribe(
        producttype => {
          this.router.navigate(['/producttype']);
          Swal.fire('Nuevo tipo de producto', `El tipo de producto  ${producttype.typeName} ha sido creado con éxito`, 'success');

        });
  }

  // cargarProducttype(): void {
  //   this.activatedRoute.params.subscribe(
  //     params => {
  //     const productTypeId = params['productTypeId'];
  //     console.log(productTypeId);
  //
  //     if (productTypeId) {
  //       this.productTypeService.getProductTypeU(productTypeId).subscribe((productType) => this.producttype = productType);
  //       console.log(productTypeId);
  //
  //     }
  //     console.log(productTypeId);
  //   });
  // }
  datosProductType: any;

  editarForm = new FormGroup({
    productTypeId: new FormControl(''),
    typeName: new FormControl(''),
  });

  update() {
    let productTypeId = this.activerouter.snapshot.paramMap.get('id');
    this.productTypeService.getProductTypeId(productTypeId).subscribe(data => {

      this.datosProductType = data;
      this.editarForm.setValue({
        'productTypeId': productTypeId,
        'typeName': this.datosProductType.typeName,
      });

    });
  }
  producType: any;
  actualizarProducttype(producttype: any){
    this.productTypeService.update(producttype)
      .subscribe( data => {
        this.producttype = data;
        swal.fire(
          'Actualizado!',
          `El producto ${producttype.typeName} se ha actualizado exitosamente.`,
          'success'
        );
        this.router.navigate(['producttype']);
        console.log(data);
        console.log(data);
      });
  }
}



