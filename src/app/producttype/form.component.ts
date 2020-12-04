import { Component, OnInit } from '@angular/core';
import {Producttype} from './producttype';
import {ProducttypeService} from './producttype.service';
import {ActivatedRoute, Router} from '@angular/router';
import swal from 'sweetalert2';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

   // @ts-ignore
  producttype: Producttype = new Producttype();
   titulo = 'Crear nuevo tipo de producto';

  constructor(private productTypeService: ProducttypeService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarProducttype();
      }


  public create(): void{
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
}



