import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CartService } from './services/cart-service.service';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { CartIconComponent } from './components/cart-icon/cart-icon.component';
import {BadgeModule} from 'primeng/badge';


const routes: Routes = [
  {
    path: 'cart',
    component: CartPageComponent
  }
]

@NgModule({
  imports: [CommonModule, BadgeModule, RouterModule.forChild(routes)],
  declarations: [
    CartPageComponent,
    CartIconComponent
  ],
  exports: [
    CartPageComponent,
    CartIconComponent
  ],
})
export class OrdersModule {

  constructor(cartService: CartService) {
    cartService.initCartLocalStorage();
  }

}
