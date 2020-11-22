import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import { ProducttypeComponent } from './producttype/producttype.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProducttypeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
