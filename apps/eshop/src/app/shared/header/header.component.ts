/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@ecommerce-brands/users';
import { LocalStorageService } from '@ecommerce-brands/users';
import { MenuItem } from 'primeng/api';


@Component({
  selector: 'eshop-header',
  templateUrl: './header.component.html',
  styleUrls: []
})
export class HeaderComponent implements OnInit {

  isAuth : boolean;
  items: MenuItem[];

  constructor(
    private authService: AuthService,
    private localStorageToken: LocalStorageService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
  }



  loginPop() {
    console.log('Logged in');
  }


}
