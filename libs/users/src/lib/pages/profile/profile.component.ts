/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';
import { Router } from '@angular/router';
import { AuthService, UsersService } from '@ecommerce-brands/users';
import { User } from '../../models/user';
import { Order, OrderItem, OrdersService, STATUS } from '@ecommerce-brands/orders';

@Component({
  selector: 'users-profile',
  templateUrl: './profile.component.html',
  styles: [
  ]
})
export class ProfileComponent implements OnInit {

  user: User;
  userId?: string;
  isGuest: boolean;
  orders: Order[] = [];
  ordersNumber: any;
  orderStatus = STATUS;

  constructor(
    private localStorageService: LocalStorageService,
    private router: Router,
    private usersService: UsersService,
    private ordersService: OrdersService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this._isAuthenticated();
    this._GetOrderItems();
  }

  private _isAuthenticated() {
    
    const token = this.localStorageService.getToken()

    if(token) {
      const tokenDecode = JSON.parse(atob(token.split(".")[1]));
        if(!this._tokenExpired(tokenDecode.exp)) {
            this.userId = tokenDecode.id;
            return null
          } else {
          this.router.navigate(['/user-login']);
        }
    }else {
      this.router.navigate(['/user-login']);
    }
  }

  private _tokenExpired(expiration: number): boolean {
    return Math.floor(new Date().getTime() / 1000) >= expiration;
  }

  private _isGuest() {
    
    if(this.userId === '6310cb9d40899c7e2c30f890') {
      return true;
    }else {
      return false;
    }

  }

  private _GetOrderItems() {
    if(this._isGuest()) {
        this.ordersService.getOrderItemByUserId(this.userId).subscribe( (orders) => {
          this.orders = orders;
          this.ordersNumber = orders.length;
          this.user = orders[0].user;
          console.log(this.user);
    })
    }
  }

  goLogout() {
    this.authService.userLogout();
  }

}
