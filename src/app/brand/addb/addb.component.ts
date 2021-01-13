import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {ServiceService} from '../../brand/service.service';
import {Router} from '@angular/router';
import {Validator} from './validator';

@Component({
  selector: 'app-addb',
  templateUrl: './addb.component.html',
  styleUrls: ['./addb.component.css']
})
export class AddbComponent implements OnInit {
  public formGroup: any;
  titleAlert = 'Este campo es requerido.';
  post: any = '';
  total = 0;


  constructor(private formBuilder: FormBuilder, private dialog: MatDialog, public service: ServiceService, private router: Router) { }

  ngOnInit(): void {
    this.createForm();
    this.setChangeValidate();
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      name: [null, Validators.required],
    });
  }


  setChangeValidate() {
    this.formGroup.get('validate').valueChanges.subscribe((validate: any) => {
      if (validate == '1') {
        this.formGroup
          .get('name')
          .setValidators([Validators.required, Validators.minLength(5), ,  Validator.cannotContainSpace(this.name)]);
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

  onSubmit(post: any) {
    this.service.createBrand({ name: post.name}).subscribe(data => { alert('La Empresa se guardo exitosamente') ; });

  }


  Listar(){
    this.router.navigate(['listarb']);
  }

  Nuevo(){
    this.router.navigate(['addb']);
  }



}
