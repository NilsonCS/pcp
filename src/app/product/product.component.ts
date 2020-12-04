import { Component, OnInit } from '@angular/core';
import { Product } from './product';
import { ProductService } from './product.service';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  product: any; 
  constructor(private productService: ProductService, private dialog: MatDialog ) { }

  ngOnInit(): void {
    this.product = this.productService.getLast();
  }
  getImg(){
    return this.product.img;
  }
  close(){
    this.dialog.closeAll();
  }
}
