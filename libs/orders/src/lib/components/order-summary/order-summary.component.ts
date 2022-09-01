import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '@ecommerce-brands/products';
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
    private router: Router
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

  navigateToCheckoout() {
    this.router.navigateByUrl('/checkout');
  }
}
