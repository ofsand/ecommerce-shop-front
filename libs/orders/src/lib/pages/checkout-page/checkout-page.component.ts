import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '@ecommerce-brands/users';
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
  userId = '6310cb9d40899c7e2c30f890';

  constructor(
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private location: Location,
    private route: ActivatedRoute,
    private cartService: CartService,
    private ordersService: OrdersService
  ) { }

  ngOnInit(): void {
    this._initUserForm();
    this._getCartItems();
  }

  private _initUserForm() {
    this.checkoutFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      city: ['', Validators.required],
      address: ['', ],
      isAdmin: [false],
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
      city: this.checkoutFormGroup.controls['city'].value,
      phone: this.checkoutFormGroup.controls['phone'].value,
      user: this.userId
    }

    this.ordersService.createOrder(order).subscribe( {
      //redirect to thank you page // payment
    });

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

}
