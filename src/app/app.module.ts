import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import { ProducttypeComponent } from './producttype/producttype.component';
import {RouterModule,Routes} from "@angular/router";
import { ListarComponent } from './Company/listar/listar.component';
import { AddComponent } from './Company/add/add.component';
import { EditComponent } from './Company/edit/edit.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServiceService } from '../app/Company/ServiceCompany/service.service';
import { StoreComponent } from './store/store.component';
import {FlexLayoutModule} from "@angular/flex-layout";
import { ProductComponent } from './product/product.component';
import { CartComponent } from './cart/cart.component';
import { ListComponent } from './city/list/list.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { FormComponent } from './producttype/form.component';
import { AddCityComponent } from './city/add-city/add-city.component';
import { AddProductComponent } from '../app/product/add-product/add-product.component';
import { RegisterComponent } from './user/register/register.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { AddbComponent } from './brand/addb/addb.component';
import { EditbComponent } from './brand/editb/editb.component';
import { ListarbComponent } from './brand/listarb/listarb.component';
import { ModelbComponent } from './brand/modelb/modelb.component';




const routes: Routes = [
  {path: '', redirectTo: '/store', pathMatch: 'full'},
  { path: "", redirectTo: "/table", pathMatch: "full" },
  {path: 'producttype', component: ProducttypeComponent},
  {path: 'store', component: StoreComponent},
  {path: 'listar', component: ListarComponent},
  {path: 'add', component: AddComponent},
  {path: 'edit/:id', component: EditComponent},
  {path: 'addProduct', component: AddProductComponent},
  {path: 'cart', component: CartComponent},
  {path: 'list', component: ListComponent},
  {path: 'producttype/form', component: FormComponent},
  {path: 'producttype/form/:id', component: FormComponent},
  {path: 'add-city', component: AddCityComponent},
  {path: 'user/register', component: RegisterComponent}
];


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProducttypeComponent,
    ListarComponent,
    AddComponent,
    EditComponent,
    StoreComponent,
    ProductComponent,
    AddProductComponent,
    CartComponent,
    ListComponent,
    CheckoutComponent,
    FormComponent,
    AddCityComponent,
    RegisterComponent,
    HeroDetailComponent,
    AddbComponent,
    EditbComponent,
    ListarbComponent,
    ModelbComponent

  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
