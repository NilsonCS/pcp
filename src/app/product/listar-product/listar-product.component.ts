import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { DomSanitizer } from "@angular/platform-browser"
import { ServiceService } from '../../product/ServiceProduct/service.service';
import { Product } from '../../product/product';
import swal from "sweetalert2";



@Component({
  selector: 'app-listar-product',
  templateUrl: './listar-product.component.html',
  styleUrls: ['./listar-product.component.css']
})
export class ListarProductComponent implements OnInit {

  products: any;
  product: Product[];
  constructor(private service:ServiceService ,private router:Router, private activerouter:ActivatedRoute, private sanitizer: DomSanitizer) {
    this.product=[];
  }

  ngOnInit(): void {
    this.service.getProduct()
    .subscribe(data =>{
      this.products=data;
    }) 
  }



  editProduct(id:any){
    this.router.navigate(["editProduct", id]);
  }

  //Boton eliminar
  eliminar(product:Product){
    //mensaje de advertencia
    swal.fire({
      title: '¿Está seguro?',
      text: `¿Seguro que desea eliminar el producto ${product.productName}?`,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
    }).then((result) => {
      if (result.value) {
        //llamando al metodo deleteCompany
        this.service.deleteProduct(product.productId)
        .subscribe( data =>{
            this.product = this.product.filter(co=>co!== product);
              
              //mensaje despues eliminacion exitosa
              swal.fire(
                'Eliminado!',
                `El producto ${product.productName} se ha eliminado exitosamente.`,
                'success'
              );
        });
      }
    });
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
  
    infoProduct(id:any){
      this.service.getProductId(id).subscribe(data =>{   
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



  Listar(){
    this.router.navigate(["listarProduct"]);
  }

  Nuevo(){
    this.router.navigate(["addProduct"]);
  }

  //imagen fondo
   myimage:string = "assets/images/background.jpg";
      
  //imagen Información
  imgInfo:string = "assets/images/info.png";

  //imagen Información
  imgCompany:string = "assets/images/imgCompany.jpg";

  //imagen empresa
  img:string = "assets/images/img.jpg";

  //imagen empresa
  imgProduct:string = "assets/images/product.jpg";



}
