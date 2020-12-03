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
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  products: Product[] = [];
  constructor(public cartService: CartService , private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts (){
    this.products = this.cartService.getProducts();
  }
  public getSantizeUrl(url : string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
