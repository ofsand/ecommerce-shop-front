import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService} from 'primeng/api';
import { take } from 'rxjs';
import { CartService } from '../../services/cart-service.service';
import { OrdersService } from '../../services/orders-service.service';

@Component({
  selector: 'orders-summary',
  templateUrl: './order-summary.component.html',
  styles: [
  ]
})
export class OrderSummaryComponent implements OnInit {
  totalPrice: number;
  isCheckoutPage: boolean;

  constructor(
    private cartService: CartService,
    private ordersService: OrdersService,
    private router: Router,
    private messageService: MessageService
  ) {
    this.router.url.includes('checkout') ? this.isCheckoutPage = true : this.isCheckoutPage = false;
  }

  ngOnInit(): void {
    this._getOrderSummary();
  }

  _getOrderSummary() {
    this.cartService.cart$.subscribe((cart) => {
      this.totalPrice = 0;
      if(cart) {
        cart.items?.map((item) => {
          this.ordersService.getProduct(item.productId)
              .pipe(take(1))
              .subscribe((product) => {
                this.totalPrice += product.price * item.quantity;
              })
        })
      }
    });
  }

  navigateToCheckout() {
    if(this.totalPrice === 0){
        this.messageService.add({severity:'warn', summary: 'warnning', detail: 'You should choose few products before going to checkout, You can not checkout an empty cart !'});        
      } else {
        this.router.navigateByUrl('/checkout');
      }

  }
}
