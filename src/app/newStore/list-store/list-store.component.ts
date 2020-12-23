import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../product/product.service';
import { ServiceService } from '../../product/ServiceProduct/service.service';
import { Product } from '../../product/product';
import { ProductComponent } from '../../product/product.component';
import { DomSanitizer } from "@angular/platform-browser"
import { MatDialog } from '@angular/material/dialog';




@Component({
  selector: 'app-list-store',
  templateUrl: './list-store.component.html',
  styleUrls: ['./list-store.component.css']
})
export class ListStoreComponent implements OnInit {

  products:any;
 // products : Product[]=[];  
  constructor(public productService:ProductService,public service:ServiceService, private sanitizer: DomSanitizer, public dialog: MatDialog ) { }

  ngOnInit(): void {
    this.getProducts();
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
      width: '900px',height:'550px',disableClose: true 
    });
  }

}
