import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LocalStorageService } from '../../services/local-storage.service';
;

@Component({
  selector: 'users-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {
  loginFormGroup: FormGroup;
  isSubmitted = false;
  auth = false;
  authMessage = 'Errorrr'

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this._initLoginForm();
  }

  private _initLoginForm() {
    this.loginFormGroup = this.formBuilder.group( {
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  onSubmit() {
    this.isSubmitted = true;

    if(this.loginFormGroup.invalid) return;

    this.authService.login(this.loginForm['email'].value, this.loginForm['password'].value).subscribe(
      (user) => {
      this.localStorageService.setToken(user.token);
      this.auth = false;
      this.router.navigate(['/']);
    },
    (error) => {
      console.log(error);
      if(error.status === 400) {
        this.authMessage = 'Wrong Email or Password !'
      }else{
        this.authMessage = 'There is a Problem on the server, Please Try later !'
      }

      this.auth = true;
    });
    }


  get loginForm() {
    return this.loginFormGroup.controls; 
    }
}
