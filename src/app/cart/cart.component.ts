import { Component, OnInit } from '@angular/core';
import { Product} from '../product/product';
import { DomSanitizer } from "@angular/platform-browser"
import { CartService } from './cart.service';
import { MatDialog } from '@angular/material/dialog';
import { CheckoutComponent } from '../checkout/checkout.component';
import { ProductComponent } from '../product/product.component';
import { ProductService } from '../product/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  total: number = 0;
  displayedColumns: string[] = ['name', 'weight', 'symbol', 'product', 'details', 'position'];
  products: Product[] = [];
  constructor(public cartService: CartService , private sanitizer: DomSanitizer, private dialog: MatDialog, public productService: ProductService) { }

  ngOnInit(): void {
    this.getProducts();
    this.getTotal();
  }

  getProducts (){
    this.products = this.cartService.getProducts();
  }
  getTotal (){
    this.total = this.cartService.getTotal();
  }
  public getSantizeUrl(url : string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(CheckoutComponent,{
      width: '640px',disableClose: true 
    });
  }
  delete(product: Product){
    this.cartService.deleteProduct(product);
    this.getProducts();
    this.getTotal();
  }
  alert(product: Product) {
    this.productService.setLast(product);
    const dialogRef = this.dialog.open(ProductComponent,{
      width: '1040px',disableClose: true 
    });
  } 
}
