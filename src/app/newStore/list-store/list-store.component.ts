import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../product/product.service';
import { Product } from '../../product/product';

@Component({
  selector: 'app-list-store',
  templateUrl: './list-store.component.html',
  styleUrls: ['./list-store.component.css']
})
export class ListStoreComponent implements OnInit {


  products : Product[]=[];  
  constructor(public productService:ProductService, ) { }

  ngOnInit(): void {
  }

  //lista de productos de la pagina
  getProducts(){
    this.productService.getProducts()
    .subscribe(products => this.products = products);
  }


}
