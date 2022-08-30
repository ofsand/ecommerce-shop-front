import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CartService } from './services/cart-service.service';
import { CartPageComponent } from './pages/cart-page/cart-page.component';

const routes: Routes = [
  {
    path: 'cart',
    component: CartPageComponent
  }
]

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  declarations: [
    CartPageComponent
  ],
  exports: [
    CartPageComponent
  ],
})
export class OrdersModule {

  constructor(cartService: CartService) {
    cartService.initCartLocalStorage();
  }

}
