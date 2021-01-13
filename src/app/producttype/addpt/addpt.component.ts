import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {ProducttypeService} from '../../producttype/producttype.service';
import {Router} from '@angular/router';
import {Brandvali} from '../addpt/brandvali';

@Component({
  selector: 'app-addb',
  templateUrl: './addpt.component.html',
  styleUrls: ['./addpt.component.css']
})
export class AddptComponent implements OnInit {

  form = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(3), Brandvali.cannotContainSpace]),
  });
  public formGroup: any;
  titleAlert = 'Este campo es requerido.';
  post: any = '';
  total = 0;

  constructor(private formBuilder: FormBuilder, private dialog: MatDialog, public service: ProducttypeService, private router: Router) { }

  ngOnInit(): void {
    this.createForm();
    this.setChangeValidate();
  }

  createForm() {
    this.formGroup = this.formBuilder.group({

      typeName: [null, Validators.required],
    });
  }

  setChangeValidate() {
    this.formGroup.get('validate').valueChanges.subscribe((validate: any) => {
      if (validate == '1') {
        this.formGroup
          .get('typeName')
          .setValidators([Validators.required, Validators.minLength(5)]);
        this.titleAlert = 'You need to specify at least 5 characters';
      } else {
        this.formGroup.get('typeName').setValidators(Validators.required);
      }
      this.formGroup.get('typeName').updateValueAndValidity();
    });
  }
  get typeName() {
    return this.formGroup.get('typeName') as FormControl;
  }
  get f(){
    return this.form.controls;
  }

  onSubmit(post: any) {
    this.service.createProductType({ typeName: post.typeName}).subscribe(data => { alert('Se guardo exitosamente') ; });

  }


  Listar(){
    this.router.navigate(['listarpt']);
  }

  Nuevo(){
    this.router.navigate(['addpt']);
  }



}
