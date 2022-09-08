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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckoutPageComponent } from './pages/checkout-page/checkout-page.component';

import {DropdownModule} from 'primeng/dropdown';
import {InputMaskModule} from 'primeng/inputmask';
import {InputTextModule} from 'primeng/inputtext';
import {InputSwitchModule} from 'primeng/inputswitch';
import { ThankYouComponent } from './pages/thank-you/thank-you.component';
import { AuthGuard } from '@ecommerce-brands/users';

const routes: Routes = [
  {
    path: 'cart',
    component: CartPageComponent
  },
  {
    path: 'checkout',
    canActivate: [AuthGuard],
    component: CheckoutPageComponent
  },
  {
    path: 'thankyou',
    component: ThankYouComponent
  }
]

@NgModule({
  imports: [CommonModule, BadgeModule, RouterModule.forChild(routes), ButtonModule, InputNumberModule, MessagesModule, MessageModule, ToastModule, FormsModule, DropdownModule, InputMaskModule, InputTextModule, ReactiveFormsModule, InputSwitchModule],
  declarations: [
    CartPageComponent,
    CartIconComponent,
    OrderSummaryComponent,
    CheckoutPageComponent,
    ThankYouComponent
  ],
  exports: [
    CartPageComponent,
    CartIconComponent,
    OrderSummaryComponent,
    CheckoutPageComponent,
    ThankYouComponent
  ],
  providers: [MessageService]
})
export class OrdersModule {

  constructor(cartService: CartService) {
    cartService.initCartLocalStorage();
  }

}
