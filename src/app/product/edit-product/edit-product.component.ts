import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { ServiceService} from '../ServiceProduct/service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from "rxjs";
import swal from "sweetalert2";



@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,  public service:ServiceService, private router:Router, private activerouter:ActivatedRoute) { }

  ngOnInit(): void {
    this.Edit();
  }


   /**ESTRUCTURA DE info Product*/
   datosProduct:any;
   productForm = new FormGroup({
       productId: new FormControl(''),
       productName: new FormControl(''),
       model: new FormControl(''),
       img: new FormControl(''),
       unitPrice: new FormControl(''),
   });
 
   Edit(){
    let productId = this.activerouter.snapshot.paramMap.get('id');
     this.service.getProductId(productId).subscribe(data =>{   
         this.datosProduct = data;  
 /** */
         this.productForm.setValue({
           'productId': this.datosProduct.productId,
           'productName': this.datosProduct.productName,
           'model': this.datosProduct.model,
           'img': this.datosProduct.img,
           'unitPrice': this.datosProduct.unitPrice,
         })   
             console.log(this.productForm.value); 
         //  console.log(data); 

       })
   }

  //guardamos los datos actualizados
  product:any;
  actualizarProducto(product:any){
    this.service.updateProduct(product)
    .subscribe( data =>{
      this.product = data;

        //mensaje despues de la actualización exitosa
        swal.fire(
          'Actualizado!',
          `La empresa ${product.productName} se ha actualizado exitosamente.`,
          'success'
        );
        //alert("Compañia Actualizada Exitosamente");
        this.router.navigate(["listarProduct"]);
        console.log(data);
    })
  }


 
  Listar(){
    this.router.navigate(["listarProduct"]);
  }

   //imagen
   myimage:string = "assets/images/background.jpg";

}
