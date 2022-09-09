import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Cart, CartService } from '@ecommerce-brands/orders';
import { AuthService } from '../../services/auth.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { MyServ } from '../../services/my-serv.service';

@Component({
  selector: 'users-login',
  templateUrl: './user-login.component.html',
  styles: [
  ]
})
export class UserLoginComponent implements OnInit {
  loginFormGroup: FormGroup;
  isSubmitted = false;
  authErr = false;
  authMessage = '';
  cartExist: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private router: Router,
    private cartService: CartService,
    private serv: MyServ
  ) {
  }

  ngOnInit(): void {
    this._initLoginForm();
  }


  private _initLoginForm() {
    this.loginFormGroup = this.formBuilder.group( {
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  guestSubmit() {
    this.isSubmitted = true;

    this.loginForm['email'].setValue('guest@email.com');
    this.loginForm['password'].setValue('guest');

    this.authService.userLogin(this.loginForm['email'].value, this.loginForm['password'].value).subscribe(
      (user) => {
      this.localStorageService.setToken(user.token);
          this.authErr = false;
          this.serv.sendUpdate(true);
          this.router.navigate(['/cart']);
          
    },
    (error) => {
      this.serv.sendUpdate(false);
      console.log(error);
      if(error.status === 400) {
        this.authMessage = 'Wrong Email or Password !'
      }else{
        this.authMessage = 'There is a Problem on the server, Please Try later !'
      }
    });

  }

  onSubmit() {
    this.isSubmitted = true;

    if(this.loginFormGroup.invalid) return;

    this.authService.userLogin(this.loginForm['email'].value, this.loginForm['password'].value).subscribe(
      (user) => {
      this.localStorageService.setToken(user.token);
      const tokenDecode = JSON.parse(atob(user.token.split(".")[1]));

      if(!tokenDecode.isAdmin) {
          this.authErr = false;
          const cart = this.cartService.getCart();
          cart.items?.find((item) => {

            if(item) {
              this.router.navigate(['/checkout']);
          } else {
              this.router.navigate(['/']);
          }
          });

      } else{
        this.authMessage = `You are logging as admin, only customers are allowed !`;
        this.authErr = true;
      }
    },
    (error) => {
      console.log(error);
      if(error.status === 400) {
        this.authMessage = 'Wrong Email or Password !'
      }else{
        this.authMessage = 'There is a Problem on the server, Please Try later !'
      }

      this.authErr = true;
    });
    }


  get loginForm() {
    return this.loginFormGroup.controls; 
    }


}
