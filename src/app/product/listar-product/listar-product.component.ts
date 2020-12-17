import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-listar-product',
  templateUrl: './listar-product.component.html',
  styleUrls: ['./listar-product.component.css']
})
export class ListarProductComponent implements OnInit {

  constructor(private router:Router, private activerouter:ActivatedRoute) { }

  ngOnInit(): void {
  }



  Listar(){
    this.router.navigate(["listarProdut"]);
  }

  Nuevo(){
    this.router.navigate(["addProduct"]);
  }

  //imagen fondo
   myimage:string = "assets/images/background.jpg";



}
