import { Component, OnInit } from '@angular/core';
import { Product } from '../../product/product';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  products: Product[] = [];
  constructor() { }

  ngOnInit(): void {
  }

}
