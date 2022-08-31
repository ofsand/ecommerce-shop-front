import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cart, CartItem } from '../models/cart';

export const CART_KEY = "cart";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart$: BehaviorSubject<Cart> = new BehaviorSubject(this.getCart());

  constructor() { }

  initCartLocalStorage() {
    //Check if cart exist 
    const cart: Cart = this.getCart();
    if(!cart) {
      //initializing cart
      const initialCart = {
        items: []
      };
      const initialCartJson = JSON.stringify(initialCart)
      localStorage.setItem(CART_KEY, initialCartJson);
    }
  }

  getCart() :Cart{
    const cartJsonString: string = localStorage.getItem(CART_KEY);
    const cart: Cart = JSON.parse(cartJsonString);
    return cart;
  }

  setCartItem(cartItem: CartItem) : Cart {
    const cart = this.getCart();
    const cartItemExist = cart.items?.find((item) => item.productId === cartItem.productId);
    if(cartItemExist) {
      cart?.items?.map(item => {
        if(item.productId === cartItem.productId) {
          item.quantity = item.quantity + cartItem.quantity;
        }
        return item;
      })
    } else {
      cart.items?.push(cartItem);
    }
    
    const cartJson = JSON.stringify(cart)
    localStorage.setItem(CART_KEY, cartJson);
    this.cart$.next(cart);
    return cart;
  }
}
