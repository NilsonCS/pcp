import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from "@angular/platform-browser"
import { MatDialog } from '@angular/material/dialog';
import { ProductComponent } from 'src/app/product/product.component';
import { Product } from '../../product/product';
import { ProductService } from '../../product/product.service';
import { CarritoServiceService  } from '../ServiceStore/carrito-service.service';
import { CheckoutComponent } from '../../checkout/checkout.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  products: Product[] = [];
  productsCantidad:any[] = [];

  total: number = 0;
  displayedColumns: string[] = ['name', 'weight', 'symbol', 'product','cantidad', 'details', 'position'];

  constructor(public carritoService:CarritoServiceService , private sanitizer: DomSanitizer, public productService:ProductService, private dialog:MatDialog,private router:Router) { }

  ngOnInit(): void {
    this.getProducts ();
    this.getTotal();
  }

  //obteniendo productos para el carrito
  //cantidad
  getProducts (){
    //this.products = this.carritoService.getProducts();
    this.productsCantidad = this.carritoService.getProductsCantidad();
  }


  //obtener la img URl
  public getSantizeUrl(url : string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  //Detalle del producto
  infoProduct(product: Product) {
    this.productService.setLast(product);
    const dialogRef = this.dialog.open(ProductComponent,{
      width: '1040px',height:'550px' ,disableClose: true 
    });
  } 

  //Eliminar producto
  delete(product: Product){
    this.carritoService.deleteProduct(product);
    this.getProducts();
  }

  //total de precios de productos
  getTotal (){
    this.total = this.carritoService.getTotal();
  }

  //Metodo openCheckout nos redirige al CheckoutComponent
  openCheckout(): void {
    const dialogRef = this.dialog.open(CheckoutComponent,{
      width: '640px' 
    });
  }

  //Metodo openSale nos redirige al saleComponent
  openSale(){
    this.router.navigate(["sale"]);
  }

}
