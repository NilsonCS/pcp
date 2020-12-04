import { Component, OnInit } from '@angular/core';
import { Product } from './product';
import { ProductService } from './product.service';
import { MatDialog } from '@angular/material/dialog';
import { CartService } from '../cart/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  product: any; 
  constructor(private productService: ProductService, private dialog: MatDialog, public cartService: CartService, private snackBar: MatSnackBar, private router: Router ) { }

  ngOnInit(): void {
    this.product = this.productService.getLast();
  }
  getImg(){
    return this.product.img;
  }
  close(){
    this.dialog.closeAll();
  }
  addToCart(product: Product){
    this.cartService.addProduct(product);
    let sb = this.snackBar.open("Producto añadido","Ver carrito", {
      duration: 2000,
    });
    sb.onAction().subscribe(() => {
       this.router.navigateByUrl('/cart')
    });
  }
}
