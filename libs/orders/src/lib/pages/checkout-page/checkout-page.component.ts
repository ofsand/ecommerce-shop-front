/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '@ecommerce-brands/users';
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
export class CheckoutPageComponent implements OnInit, OnDestroy {
  checkoutFormGroup: FormGroup;
  isSubmitted = false;
  orderItems: any = [];
  userId: any;
<<<<<<< HEAD
  unsubscribe$: Subject<void> = new Subject();
=======
  unsubscribe$: Subject<any> = new Subject();
>>>>>>> 9682675a6d24463150085a160a04ba40f061a68f

  constructor(
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private location: Location,
    private route: ActivatedRoute,
    private cartService: CartService,
    private ordersService: OrdersService,
    private router: Router
  ) { }


  ngOnInit(): void {
    this._autoFillUserData();
    this._initUserForm();
    this._getCartItems();
    this._autoFillUserData();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private _initUserForm() {
    this.checkoutFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      city: ['', Validators.required],
      address: ['', ]
    });
  }

  private _autoFillUserData() {
<<<<<<< HEAD
    this.usersService
      .observeCurrentUser()
=======
    this.usersService.observeCurrentUser()
>>>>>>> 9682675a6d24463150085a160a04ba40f061a68f
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((user) => {
        if (user) {
          this.userId = user.id;
          this.checkoutForm['name'].setValue(user.name);
          this.checkoutForm['email'].setValue(user.email);
          this.checkoutForm['phone'].setValue(user.phone);
          this.checkoutForm['city'].setValue(user.city);
          this.checkoutForm['street'].setValue(user.address);
        }
      });
  }

  placeOrder() {
    this.isSubmitted = true;
    if(this.checkoutFormGroup.invalid) {
        return;
    }   

    const order: Order = {
      orderItems: this.orderItems,
      shippingAddress: this.checkoutForm['address'].value,
      city: this.checkoutForm['city'].value,
      phone: this.checkoutForm['phone'].value,
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

      //console.log(this.orderItems);
  }

  get checkoutForm() {
    return this.checkoutFormGroup.controls;
  }

  get checkoutForm() {
    return this.checkoutFormGroup.controls;
  }

}
