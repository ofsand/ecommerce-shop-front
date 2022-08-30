import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart, CartItem, CartItemDetailed } from '../../models/cart';
import { CartService } from '../../services/cart-service.service';
import { OrdersService } from '../../services/orders-service.service';

@Component({
  selector: 'orders-cart-page',
  templateUrl: './cart-page.component.html',
  styles: [
  ]
})
export class CartPageComponent implements OnInit {

  cartItemsDetailed: CartItemDetailed[] = [];
  val: any;

  constructor(
    private route: Router,
    private cartService: CartService,
    private ordersService: OrdersService
  ) { }

  ngOnInit(): void {
    this._getCartDetails();
  }

  _getCartDetails() {
    this.cartService.cart$.subscribe(respCart => {
      respCart.items?.forEach((cartItem) => {
        this.ordersService.getProduct(cartItem.productId).subscribe((respProduct) => {
          this.cartItemsDetailed.push({
            product: respProduct,
            quantity: cartItem.quantity
          })
          this.val=cartItem.quantity;
      });
    })
  });

}
  backToShop() {
    this.route.navigateByUrl('/products');
  }
}
