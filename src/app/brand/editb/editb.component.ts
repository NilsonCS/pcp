import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {ServiceService} from '../../brand/service.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-editb',
  templateUrl: './editb.component.html',
  styleUrls: ['./editb.component.css']
})
export class EditbComponent implements OnInit {

  public formGroup: any;
  titleAlert = 'This field is required';
  post: any = '';
  total = 0;

  constructor(private formBuilder: FormBuilder, private dialog: MatDialog, public service: ServiceService, private router: Router, private activerouter: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.createForm();
    this.setChangeValidate();
    this.Edit();
  }
  createForm() {
    this.formGroup = this.formBuilder.group({
      name: [null, Validators.required]
    });
  }






  setChangeValidate() {
    this.formGroup.get('validate').valueChanges.subscribe((validate: any) => {
      if (validate == '1') {
        this.formGroup
          .get('name')
          .setValidators([Validators.required, Validators.minLength(5)]);
        this.titleAlert = 'You need to specify at least 5 characters';
      } else {
        this.formGroup.get('name').setValidators(Validators.required);
      }
      this.formGroup.get('name').updateValueAndValidity();
    });
  }
  get name() {
    return this.formGroup.get('name') as FormControl;
  }


  datosBrand: any;

  editarForm = new FormGroup({
    brandId: new FormControl(''),
    name: new FormControl(''),
  });


  Edit(){
    let brandId = this.activerouter.snapshot.paramMap.get('id');
    this.service.getBrandId(brandId).subscribe(data => {

      this.datosBrand = data;
      this.editarForm.setValue({
        'brandId': brandId,
        'name': this.datosBrand.name,
      });
      console.log(data);

    });
  }
  brand:any;
  actualizarBrand(brand: any){
    this.service.updateBrand(brand)
      .subscribe( data => {
        this.brand = data;
        alert('Compañia Actualizada Exitosamente');
        this.router.navigate(['listarb']);
        console.log(data);
      });
  }



  Listar(){
    this.router.navigate(['listarb']);
  }



}
