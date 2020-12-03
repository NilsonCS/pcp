import { Component, OnInit } from '@angular/core';
import { Product} from '../product/product';
import { DomSanitizer } from "@angular/platform-browser"
import { CartService } from './cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  total: number = 0;
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  products: Product[] = [];
  constructor(public cartService: CartService , private sanitizer: DomSanitizer) { }

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
}
