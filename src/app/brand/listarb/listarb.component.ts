import { Component, OnInit } from '@angular/core';
import {Brand} from '../modelb/Brand';
import {ServiceService} from '../../brand/service.service';
import {Router} from '@angular/router';

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
  // editBrand(id:any) {
  //   this.router.navigate("editb", id);
  // }
    Listar(){
      this.router.navigate(["listarb"]);
    }
}
