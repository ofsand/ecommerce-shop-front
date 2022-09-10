import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LocalStorageService } from '../../services/local-storage.service';
import {DialogService} from 'primeng/dynamicdialog';
import { User } from '../../models/user';
import { UsersService } from '../../services/users.service';
import { Location } from '@angular/common';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';


@Component({
  selector: 'users-login',
  templateUrl: './user-login.component.html',
  styles: [
  ]
})
export class UserLoginComponent implements OnInit {
  form: FormGroup;
  formisSubmitted = false;
  loginFormGroup: FormGroup;
  isSubmitted = false;
  authErr = false;
  authMessage = '';
  authVerification: boolean;
  registerMode = false;
  accCreated = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private router: Router,
    private usersService: UsersService,
    private location: Location,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this._initLoginForm();
    this._isAuthenticated();
    this._initUserForm();
  }

  //Register 

  private _initUserForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      city: ['', Validators.required],
      address: ['', Validators.required],
      isAdmin: [false],
    });
  }

  private _addUser(user: User) {
    this.usersService.addUser(user).subscribe(
      (user: User) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `Your account is created Successfully, you can log in now !`
        });
        timer(2000)
          .toPromise()
          .then(() => {
            this.accCreated = true;
          });
      },
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Account not created'
        });
      }
    );
  }

  onFormSubmit() {
    this.formisSubmitted = true;
    if (this.form.invalid) {
      return;
    }
    const user: User = {
      name: this.form.controls['name'].value,
      email: this.form.controls['email'].value,
      password: this.form.controls['password'].value,
      phone: this.form.controls['phone'].value,
      isAdmin: this.form.controls['isAdmin'].value,
      address: this.form.controls['address'].value,
      city: this.form.controls['city'].value
    };
    this._addUser(user);
  }

  goLogin() {
    this.registerMode = false;
  }

  createAnotherAcc() {
    this.accCreated = false;
    this._initUserForm();
    this.formisSubmitted = false;
  }

  get userForm() {
    return this.form.controls;
  }


  //Login

  private _initLoginForm() {
    this.loginFormGroup = this.formBuilder.group( {
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  guestSubmit() {
    this.isSubmitted = true;
    this.authVerification = false;

    this.loginForm['email'].setValue('guest@email.com');
    this.loginForm['password'].setValue('guest');

    this.authService.userLogin(this.loginForm['email'].value, this.loginForm['password'].value).subscribe(
      (user) => {
      this.localStorageService.setToken(user.token);
          this.authErr = false;
          this.router.navigate(['/profile']);
    });


  }

  onSubmit() {
    this.isSubmitted = true;
    this.authVerification = false;

    if(this.loginFormGroup.invalid) return;

    this.authService.userLogin(this.loginForm['email'].value, this.loginForm['password'].value).subscribe(
      (user) => {
      this.localStorageService.setToken(user.token);
      const tokenDecode = JSON.parse(atob(user.token.split(".")[1]));

      if(!tokenDecode.isAdmin) {
          this.authErr = false;
          this.router.navigate(['/profile']);
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

  private _isAuthenticated() {
    this.isSubmitted = true;
    this.authVerification = true;
    
    const token = this.localStorageService.getToken()

    if(token) {
      const tokenDecode = JSON.parse(atob(token.split(".")[1]));
        if(!this._tokenExpired(tokenDecode.exp)) {
          this.router.navigate(['/profile']);
          } else {
          return null
        }
    }else {
      return null
    }
  }

  private _tokenExpired(expiration: number): boolean {
    return Math.floor(new Date().getTime() / 1000) >= expiration;
  }

  createAcc() {
    this.registerMode = true;
  }

}