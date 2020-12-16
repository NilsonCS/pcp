import { Component, OnInit } from '@angular/core';
import {Producttype} from './producttype';
import {ProducttypeService} from './producttype.service';
import {ActivatedRoute, Router} from '@angular/router';
import swal from 'sweetalert2';
import Swal from 'sweetalert2';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {
  private locator = (p: Producttype, productTypeId: number) => p.productTypeId === productTypeId;


  // @ts-ignore
 // producttype: Producttype = new Producttype();
  producttypes: any;
  titulo = 'Crear nuevo tipo de producto';
 // errores: string[];
  constructor(private productTypeService: ProducttypeService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.update();
    this.productTypeService.getProducttype().subscribe(data => {this.producttypes = data;})
  }


  public create(): void {
    this.productTypeService.create(this.producttype)
      .subscribe(
        producttype => {
          this.router.navigate(['/producttype']);
          Swal.fire('Nuevo tipo de producto', `El tipo de producto  ${producttype.typeName} ha sido creado con éxito`, 'success');

        });
  }


  datosProductType:any;

  editarForm = new FormGroup({
    ProductTypeId: new FormControl(''),
    name: new FormControl(''),
  });


  update(){
    let productTypeId = this.activatedRoute.snapshot.paramMap.get('id');
    this.productTypeService.getProducttypeId(productTypeId).subscribe(data=>{
      this.datosProductType=data;
      this.editarForm.setValue({
          'productTypeId':productTypeId,
          'name':this.datosProductType.name
        })
    })
  }

  cargarProducttype(): void {
    this.activatedRoute.params.subscribe(
      params => {
      const productTypeId = params['productTypeId'];
      console.log(productTypeId);

      if (productTypeId) {
        this.productTypeService.getProductTypeU(productTypeId).subscribe((productType) => this.producttype = productType);
        console.log(productTypeId);

      }
      console.log(productTypeId);
    });
  }
  producttype:any;
  actualizarProducttype(producttype:any){
    this.productTypeService.update(producttype)
      .subscribe(data =>{
        this.producttype = data;
        alert("Succes");
        this.router.navigate(["producttype"]);
        console.log(data);
      })
  }




  // update(productType: any) {
  //   this.productTypeService.update(productType)
  //     .subscribe(
  //       p => {
  //         this.producttype = p;
  //         this.router.navigate(['/producttype']);
  //       //  swal.fire('Tipo de producto Actualizado', `${json.mensaje}: ${json.producttype.typeName}`, 'success');
  //       },
  //       err => {
  //       //  this.errores = err.error.errors as string[];
  //         console.error('Código del error desde el backend: ' + err.status);
  //         console.error(err.error.errors);
  //       }
  //     );
  // }
}



