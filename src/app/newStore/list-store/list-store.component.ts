import { Component, OnInit,ViewChild } from '@angular/core';
import { ProductService } from '../../product/product.service';
import { ServiceService } from '../../product/ServiceProduct/service.service';
import { CarritoServiceService } from '../ServiceStore/carrito-service.service';
import { Product } from '../../product/product';
import { ProductComponent } from '../../product/product.component';
import { DomSanitizer } from "@angular/platform-browser"
import { MatDialog } from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-list-store',
  templateUrl: './list-store.component.html',
  styleUrls: ['./list-store.component.css']
})
export class ListStoreComponent implements OnInit {

  products:any;
  //paginacion
  //productoPaginacion: Product[]=[];
  public page: number=0;

 // products : Product[]=[];  
  constructor(public productService:ProductService,public service:ServiceService,public carritoService:CarritoServiceService,
              private sanitizer: DomSanitizer, public dialog: MatDialog,private snackBar: MatSnackBar, private router: Router
              ,private http: HttpClient) {
                
              }

  

  ngOnInit(): void {
    this.getProducts();
    //paginacion

  }

  
  /**lista de productos de la pagina
  getProducts(){
    this.productService.getProducts()
    .subscribe(products => this.products = products);
  }
*/
  getProducts(){
    this.service.getProducts()
    .subscribe(data => {
      this.products = data;
    });
  } 


  //metodo para obtener imgs de la base de datos
  public getImgUrl(url : string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  //metodo para ver inf. de nuestro producto
  productInfo(product: Product) {
    this.productService.setLast(product);
    const dialogRef = this.dialog.open(ProductComponent,{
      width: '1040px',height:'550px',disableClose: true 
    });
  }


  //añadir al carrito
  addToCart(product: Product){
    this.carritoService.addProduct(product);
    let sb = this.snackBar.open("Producto añadido","Ver carrito", {
      duration: 2000,
    });
    sb.onAction().subscribe(() => {
       this.router.navigateByUrl('/carrito')
    });
  }
   

}
