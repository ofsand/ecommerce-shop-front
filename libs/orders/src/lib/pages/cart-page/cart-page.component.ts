import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '@ecommerce-brands/products';
import { CartService } from '../../services/cart-service.service';
import { OrdersService } from '../../services/orders-service.service';

@Component({
  selector: 'orders-cart-page',
  templateUrl: './cart-page.component.html',
  styles: [
  ]
})
export class CartPageComponent implements OnInit {

  constructor(
    private route: Router,
    private cartService: CartService,
    private productService: ProductsService
  ) { }

  ngOnInit(): void {
    this._getCartDetails();
  }

  _getCartDetails() {
    this.cartService.cart$.subscribe(respCart => {
      respCart.items?.forEach((cartItem) => {
        this.productService.getProduct(cartItem.productId).subscribe((product) => {})
      })
    })
  }

  backToShop() {
    this.route.navigateByUrl('/products');
  }
}
