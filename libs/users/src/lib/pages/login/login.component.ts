import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';import { AuthService } from '../../services/auth.service';
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
    private authService: AuthService
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

    this.authService.login(this.loginForm['email'].value, this.loginForm['password'].value).subscribe((user) => {
      console.log(user);
      this.auth = false;
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
