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

import { FormsModule } from '@angular/forms';
import { ServiceService } from '../app/Company/ServiceCompany/service.service';



const routes: Routes = [
  {path: '', redirectTo: '/header', pathMatch: 'full'},
  {path: 'header', component: HeaderComponent},
  {path: 'producttype', component: ProducttypeComponent},
  
  {path: 'listar', component: ListarComponent},
  {path: 'add', component: AddComponent},
  {path: 'edit', component: EditComponent},



];


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProducttypeComponent,
    ListarComponent,
    AddComponent,
    EditComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
