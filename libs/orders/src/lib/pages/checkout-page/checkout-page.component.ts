/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService, User, UsersService } from '@ecommerce-brands/users';
import { Subject, takeUntil } from 'rxjs';
import { MessageService } from 'primeng/api';
import { Cart } from '../../models/cart';
import { OrderItem } from '../../models/order-item';
import { Order } from '../../models/orders';
import { CartService } from '../../services/cart-service.service';
import { OrdersService } from '../../services/orders-service.service';
import { ProductsService } from '@ecommerce-brands/products';

@Component({
  selector: 'orders-checkout-page',
  templateUrl: './checkout-page.component.html',
  styles: [
  ]
})
export class CheckoutPageComponent implements OnInit {
  checkoutFormGroup: FormGroup;
  isSubmitted = false;
  orderItems: any = [];
  userId: any;
  isGuest: boolean
  user: User;

  constructor(
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private location: Location,
    private route: ActivatedRoute,
    private cartService: CartService,
    private ordersService: OrdersService,
    private router: Router,
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit(): void {
    this._initUserForm();
    this._getCartItems();
    this._checkUser();
  }

  private _initUserForm() {
    this.checkoutFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      password: [''],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      city: ['', Validators.required],
      address: ['', Validators.required],
      isAdmin: [false],
    });
  }


  placeOrder() {
    this.isSubmitted = true;
    if(this.checkoutFormGroup.invalid) {
      return;
    }   
    
    console.log('here')
    const order: Order = {
      orderItems: this.orderItems,
      name: this.checkoutFormGroup.controls['name'].value,
      shippingAddress: this.checkoutFormGroup.controls['address'].value,
      city: this.checkoutFormGroup.controls['city'].value,
      phone: this.checkoutFormGroup.controls['phone'].value,
      status: '0',
      user: this.userId
    }
    this.cartService.emptyCart();
    this.ordersService.createOrder(order).subscribe(() => {
      this.router.navigateByUrl('/thankyou')
    });

  }

  backToCart() {
    this.router.navigate(['/cart']);
  }

  private _getCartItems() {
      const cart: Cart = this.cartService.getCart();
      this.orderItems = cart.items?.map(item => {
        return {
          product: item.productId,
          quantity: item.quantity
        }
      })
  }

  get checkoutForm() {
    return this.checkoutFormGroup.controls;
  }

  private _checkUser() {
    const token = this.localStorageService.getToken()
    if(token) {
      const tokenDecode = JSON.parse(atob(token.split(".")[1]));
        if(!this._tokenExpired(tokenDecode.exp)) {
            this.userId = tokenDecode.id;
            if(this.userId === '6310cb9d40899c7e2c30f890') {
              this.isGuest = true
            } else {
              this.isGuest = false
              this._placeData(this.userId)
            }
        }
    }
  }

  private _tokenExpired(expiration: number): boolean {
    return Math.floor(new Date().getTime() / 1000) >= expiration;
  }

  private _placeData(userId: string) {
    this.usersService.getUser(userId).subscribe( (user) => {
      this.checkoutFormGroup.controls['name'].setValue(user.name);
      this.checkoutFormGroup.controls['email'].setValue(user.email);
      this.checkoutFormGroup.controls['phone'].setValue(user.phone);
      this.checkoutFormGroup.controls['address'].setValue(user.address);
      this.checkoutFormGroup.controls['city'].setValue(user.city);
    });
  }

  GoProfile() {
    this.router.navigate(['/profile']);
  }
}
