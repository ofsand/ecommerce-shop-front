import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { OrdersModule } from '@ecommerce-brands/orders';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { UiModule } from '@ecommerce-brands/ui';

import {AccordionModule} from 'primeng/accordion';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NavComponent } from './shared/nav/nav.component';
import { ProductsModule } from '@ecommerce-brands/products';
import { FooterSecondComponent } from './shared/footer-second/footer-second.component';
import { JwtInterceptor, UsersModule } from '@ecommerce-brands/users';
import { HTTP_INTERCEPTORS } from '@angular/common/http';


const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    HeaderComponent,
    FooterComponent,
    NavComponent,
    FooterSecondComponent
  ],
  imports: [BrowserModule, 
    RouterModule.forRoot(routes), 
    UiModule, 
    AccordionModule, 
    BrowserAnimationsModule, 
    ProductsModule, 
    UiModule, 
    OrdersModule, 
    UsersModule,
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}],
  bootstrap: [AppComponent],
  exports: [
    FooterSecondComponent
  ],
})
export class AppModule {}
