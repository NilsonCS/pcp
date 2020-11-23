import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import { ProducttypeComponent } from './producttype/producttype.component';
import {RouterModule,Routes} from "@angular/router";


const routes: Routes = [
  {path: '', redirectTo: '/header', pathMatch: 'full'},
  {path: 'header', component: HeaderComponent},
  {path: 'producttype', component: ProducttypeComponent},
];


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProducttypeComponent
  ],
  imports: [
    BrowserModule,
     RouterModule.forRoot(routes),
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
