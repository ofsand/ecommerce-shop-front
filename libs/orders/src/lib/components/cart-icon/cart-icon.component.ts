/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CartService } from '../../services/cart-service.service';
import { OrdersService } from '../../services/orders-service.service';

@Component({
  selector: 'orders-cart-icon',
  templateUrl: './cart-icon.component.html',
  styles: [
  ]
})
export class CartIconComponent implements OnInit {
  cartCount? = 0;
  addedProductName: string;

  constructor(
    private cartService: CartService,
    private ordersService: OrdersService,
    private messageService: MessageService ,
  ) { }

  ngOnInit(): void {
    this._getCartItemsNumber();
  }

  _getCartItemsNumber() {
    this.cartService.cart$.subscribe(cart => {
      this.cartCount = cart?.items?.length ?? 0;
      this.messageService.add(
        { severity:'success',
          summary:'product Added',
          detail: `The product is added to the Cart successfully !`
        });
    });
  }

}
