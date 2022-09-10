/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'eshop-header',
  templateUrl: './header.component.html',
  styleUrls: []
})
export class HeaderComponent implements OnInit {

  constructor(
    private router: Router,
  ) {}

  ngOnInit(): void {}

  goLogin() {
    this.router.navigate(['/user-login']);
  }

  
}
