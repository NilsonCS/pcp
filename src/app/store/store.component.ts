import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product/product.service';
import { Product} from '../product/product';
import { DomSanitizer } from "@angular/platform-browser"
import { CartService } from '../cart/cart.service';
import { ProductComponent } from '../product/product.component';
import { MatDialog } from '@angular/material/dialog'
@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {
  products: Product[]=[];
  constructor(public productService: ProductService, private sanitizer: DomSanitizer, public cartService: CartService, public dialog: MatDialog ) { }

  ngOnInit(): void {
    this.getProducts();
  }
  alert(product: Product) {
    this.productService.setLast(product);
    const dialogRef = this.dialog.open(ProductComponent,{
      width: '1040px',disableClose: true 
    });
  }
  getProducts (){
    this.productService.getProducts().subscribe(products => this.products = products);
  }
  public getSantizeUrl(url : string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  addToCart(product: Product){
    this.cartService.addProduct(product);
    alert("El producto fue añadido")
  }
}
