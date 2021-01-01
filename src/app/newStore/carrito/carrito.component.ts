import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from "@angular/platform-browser"
import { Product } from '../../product/product';
import { CarritoServiceService  } from '../ServiceStore/carrito-service.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  products: Product[] = [];
  displayedColumns: string[] = ['name', 'weight', 'symbol', 'product', 'details', 'position'];

  constructor(public carritoService:CarritoServiceService , private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.getProducts ();
  }

  //obteniendo productos para el carrito
  getProducts (){
    this.products = this.carritoService.getProducts();
  }

  //obtener la img URl
  public getSantizeUrl(url : string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
