import { Component, OnInit } from '@angular/core';
import { ServiceCheckoutService } from '../ServiceCheckout/service-checkout.service'; 
import { Checkout } from '../checkout';
import swal from "sweetalert2";


@Component({
  selector: 'app-list-checkout',
  templateUrl: './list-checkout.component.html',
  styleUrls: ['./list-checkout.component.css']
})
export class ListCheckoutComponent implements OnInit {

  productoReservas: any;
  checkouts: any;
  checkout:Checkout[];// para metodo eliminar
  constructor(private serviceCheckout:ServiceCheckoutService) {
    this.checkout = [];
   }

  ngOnInit(): void {
    this.serviceCheckout.getCheckout()
    .subscribe(data =>{
      this.checkouts=data;
    })  

    // Lista ProductoReserva
    this.serviceCheckout.getPr()
    .subscribe(data =>{
      this.productoReservas=data;
    })  
  }


    //Boton eliminar
  eliminar(checkout:Checkout){
    //mensaje de advertencia
    swal.fire({
      title: '¿Está seguro?',
      text: `¿Seguro que desea eliminar la reserva ${checkout.contact}?`,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',

    }).then((result) => {
      if (result.value) {

        //llamando al metodo deleteCheckout
        this.serviceCheckout.deleteCheckout(checkout.checkoutId)
        .subscribe( data =>{
            this.checkout = this.checkout.filter(co=>co!== checkout);
              
              //mensaje despues eliminacion exitosa
              swal.fire(
                'Eliminado!',
                `La reserva ${checkout.contact} se ha eliminado exitosamente.`,
                'success'
              );
        });
      }
    });
    
  }

}
