import { Component, OnInit } from '@angular/core';
import {Brand} from '../modelb/Brand';
import {ServiceService} from '../../brand/service.service';
import {Router} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';
import swal from "sweetalert2";

@Component({
  selector: 'app-listarb',
  templateUrl: './listarb.component.html',
  styleUrls: ['./listarb.component.css']
})
export class ListarbComponent implements OnInit {

   brands: any;
   brand:Brand[];

  constructor(private service:ServiceService ,private router:Router) {
    this.brand = [];
  }

  ngOnInit(): void {
    this.service.getBrand()
      .subscribe(data =>{
        this.brands=data;
      })
  }
  editBrand(id:any) {
    this.router.navigate(["editb", id]);
    console.log(id);
  }

  datosBrand:any;
  editarForm = new FormGroup({
    brandId: new FormControl(''),
    name: new FormControl('')
  });

  infoBrand(id:any){
    this.service.getBrandId(id).subscribe(data =>{
      this.datosBrand = data;
      this.editarForm.setValue({
        'brandId': this.datosBrand.brandId,
        'name': this.datosBrand.name
      })
      console.log(this.editarForm.value);
    })
  }


    Listar(){
      this.router.navigate(["listarb"]);
    }
  Nuevo(){
    this.router.navigate(["addb"]);
  }

  eliminar(brand: Brand): void {
    // @ts-ignore
    swal.fire({
      title: 'Está seguro?',
      text: `¿Seguro que desea eliminar este tipo de producto ${brand.name} ?`,
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

        this.service.deleteBrand(brand.brandId).subscribe(
          () => {
            this.brands = this.brand.filter(cli => cli !== brand);
            swal.fire(
              'Tipo de product!',
              `Tipo de producto ${brand.name} eliminado con éxito.`,
              'success'
            );
          });
      }
    });
  }

}
