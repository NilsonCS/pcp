import { Component, OnInit } from '@angular/core';
import {Producttype} from './producttype';
import {ProducttypeService} from './producttype.service';
import {ActivatedRoute, Router} from '@angular/router';
import swal from 'sweetalert2';
import Swal from 'sweetalert2';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  // @ts-ignore
  producttype: Producttype = new Producttype();
  titulo = 'Crear nuevo tipo de producto';
 // errores: string[];
  constructor(private productTypeService: ProducttypeService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.cargarProducttype();
  }


  public create(): void {
    this.productTypeService.create(this.producttype)
      .subscribe(
        producttype => {
          this.router.navigate(['/producttype']);
          Swal.fire('Nuevo tipo de producto', `El tipo de producto  ${producttype.typeName} ha sido creado con éxito`, 'success');

        });
  }

  cargarProducttype(): void {
    this.activatedRoute.params.subscribe(params => {
      const productTypeId = params.productTypeId;
      if (productTypeId) {
        this.productTypeService.getProductTypee(productTypeId).subscribe((productType) => this.producttype = productType);
      }
    });
  }

  update(): void {
    this.productTypeService.update(this.producttype)
      .subscribe(
        json => {
          this.router.navigate(['/producttype']);
          swal.fire('Tipo de producto Actualizado', `${json.mensaje}: ${json.producttype.productTypeId}, ${json.producttype.typeName}`, 'success');
        },
        err => {
        //  this.errores = err.error.errors as string[];
          console.error('Código del error desde el backend: ' + err.status);
          console.error(err.error.errors);
        }
      );
  }
}



