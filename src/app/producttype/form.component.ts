import { Component, OnInit } from '@angular/core';
import {Producttype} from './producttype';
import {ProducttypeService} from './producttype.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

   producttype: Producttype = new Producttype(2, '');
   titulo = 'Crear nuevo tipo de producto';

  constructor(private productTypeService: ProducttypeService,
              private router: Router,
              private activetedRoute: ActivatedRoute) { }

  ngOnInit(): void {
  }


  public create(): void{

    this.productTypeService.create(this.producttype)
      .subscribe(
        producttype => {
          this.router.navigate(['/producttype']);
        });
  }
}



