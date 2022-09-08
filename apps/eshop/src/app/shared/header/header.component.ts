/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { AuthService } from '@ecommerce-brands/users';

@Component({
  selector: 'eshop-header',
  templateUrl: './header.component.html',
  styleUrls: []
})
export class HeaderComponent implements OnInit {
  constructor(
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  logoutUser() {
    this.authService.userLogout();
  }
}
