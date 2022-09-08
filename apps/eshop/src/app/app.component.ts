import { Component, OnInit } from '@angular/core';
import { UsersService } from '@ecommerce-brands/users';

@Component({
  selector: 'eshop-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  constructor(private usersService: UsersService) {

  }

  ngOnInit() {
    this.usersService.initAppSession();
  }

  title = 'eshop';
}
