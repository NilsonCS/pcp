import { Component, OnInit } from '@angular/core';
import {Brand} from '../modelb/Brand';
import {ServiceService} from '../../brand/service.service';
import {Router} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';

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


}
