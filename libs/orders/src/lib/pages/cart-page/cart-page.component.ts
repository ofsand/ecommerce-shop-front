import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartItem, CartItemDetailed } from '../../models/cart';
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
  cartEmpty: boolean;

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
      this.cartItemsDetailed = [];
      this.cartEmpty = false;
      respCart.items?.forEach((cartItem) => {
        this.ordersService.getProduct(cartItem.productId).subscribe((respProduct) => {
          this.cartEmpty = true;
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

  deleteCartItem(cartItem: CartItemDetailed) {
    this.cartService.deleteCartItem(cartItem.product.id);
  }

  updateCartItemQuantity(event, cartItem: CartItemDetailed) {
    this.cartService.setCartItem({
      productId: cartItem.product.id,
      quantity: event.value
    }, true);
  }
}
