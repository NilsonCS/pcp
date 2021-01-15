import { Component, OnInit } from '@angular/core';
import { SaleServiceService } from '../../ServiceStore/sale-service.service';
import { Sale } from '../model/Sale';
import swal from "sweetalert2";

@Component({
  selector: 'app-list-sale',
  templateUrl: './list-sale.component.html',
  styleUrls: ['./list-sale.component.css']
})
export class ListSaleComponent implements OnInit {
  
  sales: any;
  sale:Sale[];

  constructor(private saleService:SaleServiceService) {
    this.sale = [];
   }

  ngOnInit(): void {
    this.saleService.getSale()
    .subscribe(data =>{
      this.sales=data;
    })  

  }


  //Boton eliminar
  eliminar(sale:Sale){
    //mensaje de advertencia
    swal.fire({
      title: '¿Está seguro?',
      text: `¿Seguro que desea eliminar la venta de ${sale.name}?`,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',

    }).then((result) => {
      if (result.value) {

        //llamando al metodo deleteCompany
        this.saleService.deleteSale(sale.saleId)
        .subscribe( data =>{
            this.sale = this.sale.filter(co=>co!== sale);
              
              //mensaje despues eliminacion exitosa
              swal.fire(
                'Eliminado!',
                `La venta de ${sale.name} se ha eliminado exitosamente.`,
                'success'
              );
        });
      }
    });
    
  }

}
