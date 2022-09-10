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
    if(this.isGuest) {
      this._placeData()
    }
  }

  private _initUserForm() {
    this.checkoutFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      //password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      //zipCode: ['', Validators.required],
      city: ['', Validators.required],
      address: ['', Validators.required],
      //isAdmin: [false],
    });
  }


  placeOrder() {
    this.isSubmitted = true;
    if(this.checkoutFormGroup.invalid) {
        return;
    }   

    const order: Order = {
      orderItems: this.orderItems,
      shippingAddress: this.checkoutFormGroup.controls['address'].value,
      name: this.checkoutFormGroup.controls['name'].value,
      city: this.checkoutFormGroup.controls['city'].value,
      //zipCode: this.checkoutFormGroup.controls['zipCode'].value,
      phone: this.checkoutFormGroup.controls['phone'].value,
      status: '0',
      user: this.userId
    }

    this.ordersService.createOrder(order).subscribe(
      () => {
        //redirect to thank you page // payment
        this.cartService.emptyCart();
        this.router.navigate(['/thankyou']);
      },
      () => {
        //display some message to user
      }
    );

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

      console.log(this.orderItems);
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
            }
        }
    }
  }

  private _tokenExpired(expiration: number): boolean {
    return Math.floor(new Date().getTime() / 1000) >= expiration;
  }

  private _placeData() {
    this.ordersService.getOrderItemByUserId(this.userId).subscribe( (orders) => {
      this.user = orders[0].user;
      this.checkoutFormGroup.controls['name'].setValue(this.user.name);
      this.checkoutFormGroup.controls['phone'].setValue(this.user.phone);
      this.checkoutFormGroup.controls['email'].setValue(this.user.email);
      this.checkoutFormGroup.controls['address'].setValue(this.user.address);
      this.checkoutFormGroup.controls['city'].setValue(this.user.city);
    });
  }

  GoProfile() {
    this.router.navigate(['/profile']);
  }
}
