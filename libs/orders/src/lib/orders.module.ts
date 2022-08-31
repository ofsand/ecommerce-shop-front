import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CartService } from './services/cart-service.service';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { CartIconComponent } from './components/cart-icon/cart-icon.component';
import {BadgeModule} from 'primeng/badge';
import {ButtonModule} from 'primeng/button';
import {InputNumberModule} from 'primeng/inputnumber';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {ToastModule} from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';

const routes: Routes = [
  {
    path: 'cart',
    component: CartPageComponent
  }
]

@NgModule({
  imports: [CommonModule, BadgeModule, RouterModule.forChild(routes), ButtonModule, InputNumberModule, MessagesModule, MessageModule, ToastModule],
  declarations: [
    CartPageComponent,
    CartIconComponent,
    OrderSummaryComponent
  ],
  exports: [
    CartPageComponent,
    CartIconComponent,
    OrderSummaryComponent
  ],
  providers: [MessageService]
})
export class OrdersModule {

  constructor(cartService: CartService) {
    cartService.initCartLocalStorage();
  }

}
