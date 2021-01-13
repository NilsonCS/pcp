import { Component, OnInit } from '@angular/core';
import { ServiceCheckoutService } from '../ServiceCheckout/service-checkout.service'; 
import { Checkout } from '../checkout';

@Component({
  selector: 'app-list-checkout',
  templateUrl: './list-checkout.component.html',
  styleUrls: ['./list-checkout.component.css']
})
export class ListCheckoutComponent implements OnInit {

  checkouts: any;
  constructor(private serviceCheckout:ServiceCheckoutService) { }

  ngOnInit(): void {
    this.serviceCheckout.getCheckout()
    .subscribe(data =>{
      this.checkouts=data;
    })  

  }

}
