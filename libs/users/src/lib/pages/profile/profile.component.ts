/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';
import { Router } from '@angular/router';
import { AuthService, UsersService } from '@ecommerce-brands/users';
import { User } from '../../models/user';
import { Order, OrderItem, OrdersService, STATUS } from '@ecommerce-brands/orders';
import { MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

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

  form: FormGroup;
  isSubmitted = false;
  editmode = true;


  constructor(
    private localStorageService: LocalStorageService,
    private router: Router,
    private usersService: UsersService,
    private ordersService: OrdersService,
    private authService: AuthService,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this._isAuthenticated();
    this._GetOrderItems();
    this._initUserForm();
  }


  private _initUserForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      password: ['', ],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      city: ['', Validators.required],
      address: ['', Validators.required],
    });
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

          this.form.controls['name'].setValue(this.user.name);
          this.form.controls['phone'].setValue(this.user.phone);
          this.form.controls['email'].setValue(this.user.email);
          this.form.controls['address'].setValue(this.user.address);
          this.form.controls['city'].setValue(this.user.city);
          this.form.controls['password'].setValidators([]);
          this.form.controls['password'].updateValueAndValidity();
    })
    }
  }

  goLogout() {
    this.authService.userLogout();
  }

  //Form methods

  private _updateUser(user: User) {
    this.usersService.updateUser(user, this.userId).subscribe(
      () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Your Infomation are updated!'
        });
      },
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'User is not updated!'
        });
      }
    );
  }


  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) {
      return;
    }
    const user: User = {
      id: this.userId,
      name: this.form.controls['name'].value,
      email: this.form.controls['email'].value,
      password: this.form.controls['password'].value,
      phone: this.form.controls['phone'].value,
      address: this.form.controls['address'].value,
      city: this.form.controls['city'].value
    };
      this._updateUser(user);
  }

}
