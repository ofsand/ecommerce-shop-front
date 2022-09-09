import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LocalStorageService } from '../../services/local-storage.service';
;

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
  authVerification: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this._initLoginForm();
    this._isAuthenticated();
  }

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
          this.router.navigate(['/checkout']);
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
          this.router.navigate(['/checkout']);
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

}