import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {RouterModule,Routes} from "@angular/router";
import { ListarComponent } from './Company/listar/listar.component';
import { AddComponent } from './Company/add/add.component';
import { EditComponent } from './Company/edit/edit.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreComponent } from './store/store.component';
import {FlexLayoutModule} from "@angular/flex-layout";
import { ProductComponent } from './product/product.component';
import { CartComponent } from './cart/cart.component';
import { ListComponent } from './city/list/list.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { AddCityComponent } from './city/add-city/add-city.component';
import { AddProductComponent } from '../app/product/add-product/add-product.component';
import { RegisterComponent } from './user/register/register.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { AddbComponent } from './brand/addb/addb.component';

import { EditbComponent } from './brand/editb/editb.component';
import { EditptComponent } from './producttype/editpt/editpt.component';
import { ListarbComponent } from './brand/listarb/listarb.component';
import { ListarptComponent } from './producttype/listarpt/listarpt.component';
import { ListarProductComponent } from './product/listar-product/listar-product.component';
import { EditProductComponent } from './product/edit-product/edit-product.component';
import { AddStoreComponent } from './newStore/add-store/add-store.component';
import { ListStoreComponent } from './newStore/list-store/list-store.component';




const routes: Routes = [
  {path: '', redirectTo: '/store', pathMatch: 'full'},
  { path: "", redirectTo: "/table", pathMatch: "full" },
  {path: 'store', component: StoreComponent},
  {path: 'listar', component: ListarComponent},
  {path: 'listarb', component: ListarbComponent},
  {path: 'listarpt', component: ListarptComponent},
  {path: 'add', component: AddComponent},
  {path: 'addb', component: AddbComponent},
  {path: 'edit/:id', component: EditComponent},
  {path: 'editb/:id', component: EditbComponent},
  {path: 'editpt/:id', component: EditptComponent},
  {path: 'addProduct', component: AddProductComponent},
  {path: 'cart', component: CartComponent},
  {path: 'list', component: ListComponent},
  {path: 'add-city', component: AddCityComponent},
  {path: 'user/register', component: RegisterComponent},
  {path: 'listarProduct', component: ListarProductComponent},
  {path: 'editProduct/:id', component: EditProductComponent},
  //nuevo Carrito
  {path: 'addStore', component: AddStoreComponent},
  {path: 'listarStore', component: ListStoreComponent}



];


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ListarComponent,
    AddComponent,
    EditComponent,
    StoreComponent,
    ProductComponent,
    AddProductComponent,
    CartComponent,
    ListComponent,
    CheckoutComponent,
    AddCityComponent,
    RegisterComponent,
    HeroDetailComponent,
    AddbComponent,
    EditbComponent,
    EditptComponent,
    ListarbComponent,
    ListarptComponent,
    ListarProductComponent,
    EditProductComponent,
    AddStoreComponent,
    ListStoreComponent

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
