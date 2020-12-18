import { Component, OnInit } from '@angular/core';
import {ProducttypeService} from '../../producttype/producttype.service';
import {Router} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';
import swal from "sweetalert2";
import {Producttype} from '../producttype';

@Component({
  selector: 'app-listarb',
  templateUrl: './listarpt.component.html',
  styleUrls: ['./listarpt.component.css']
})
export class ListarptComponent implements OnInit {

   producttypes: any;
   producttype:Producttype[];

  constructor(private service:ProducttypeService ,private router:Router) {
    this.producttype = [];
  }

  ngOnInit(): void {
    this.service.getProducttype()
      .subscribe(data =>{
        this.producttypes=data;
      })
  }
  editProducttype(id:any) {
    this.router.navigate(["editpt", id]);
    console.log(id);
  }

  datosProducttype:any;
  editarForm = new FormGroup({
    productTypeId: new FormControl(''),
    typeName: new FormControl('')
  });

  infoProducttype(id:any){
    this.service.getProducttypeId(id).subscribe(data =>{
      this.datosProducttype = data;
      this.editarForm.setValue({
        'productTypeId': this.datosProducttype.productTypeId,
        'typeName': this.datosProducttype.typeName
      })
      console.log(this.editarForm.value);
    })
  }


    Listar(){
      this.router.navigate(["listarpt"]);
    }
  Nuevo(){
    this.router.navigate(["addpt"]);
  }

  eliminar(producttype: Producttype): void {
    // @ts-ignore
    swal.fire({
      title: 'Está seguro?',
      text: `¿Seguro que desea eliminar este tipo de producto ${producttype.typeName} ?`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false,
      reverseButtons: true
    }).then((result) => {
      if (result.value) {

        this.service.deleteProducttype(producttype.productTypeId).subscribe(
          () => {
            this.producttypes = this.producttype.filter(cli => cli !== producttype);
            swal.fire(
              'Tipo de product!',
              `Tipo de producto ${producttype.typeName} eliminado con éxito.`,
              'success'
            );
          });
      }
    });
  }

}
