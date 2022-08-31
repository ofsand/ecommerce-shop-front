import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart-service.service';

@Component({
  selector: 'orders-cart-icon',
  templateUrl: './cart-icon.component.html',
  styles: [
  ]
})
export class CartIconComponent implements OnInit {
  CartCount? = 0;

  constructor(
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this._getCartItemsNumber();
  }

  _getCartItemsNumber() {
    this.cartService.cart$.subscribe(cart => {
        this.CartCount = cart.items?.length;
    })
  }

}
