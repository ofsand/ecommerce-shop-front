import { Component, OnInit } from '@angular/core';
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

  constructor(
    private cartService: CartService,
    private ordersService: OrdersService
  ) { }

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
}
