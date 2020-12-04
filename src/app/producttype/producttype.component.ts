import {Component, Injectable, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {Producttype} from "./producttype";
import {ProducttypeService} from "./producttype.service";
import swal from "sweetalert2";

@Component({
  selector: 'app-producttype',
  templateUrl: './producttype.component.html',
  styleUrls: ['./producttype.component.css']
})

 @Injectable()
export class ProducttypeComponent implements OnInit {


 //producttype: Producttype[] = [];

 producttypes: Producttype[];

  // producttype: Producttype [] = [
  //   {productTypeId:1,typeName:"MB"}
  // ];

constructor(private producttypeService: ProducttypeService ) {
  this.producttypes = [];
}


  ngOnInit(): void {
    this.producttypeService.getProducttype()
      .subscribe(data =>
      {this.producttypes = data;
      });

  }

  delete(productType: Producttype): void {
    // @ts-ignore
    swal.fire({
      title: 'Está seguro?',
      text: `¿Seguro que desea eliminar este tipo de producto ${productType.typeName} ?`,
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

        this.producttypeService.delete(productType.productTypeId).subscribe(
          () => {
            this.producttypes = this.producttypes.filter(cli => cli !== productType);
            swal.fire(
              'Tipo de product!',
              `Tipo de producto ${productType.typeName} eliminado con éxito.`,
              'success'
            );
    });
    }
    });
}
}
