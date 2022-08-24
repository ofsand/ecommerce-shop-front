import { Component, OnInit } from '@angular/core';
import { UsersService } from '@ecommerce-brands/products';

@Component({
  selector: 'admin-user-list',
  templateUrl: './user-list.component.html',
  styles: [
  ]
})
export class UserListComponent implements OnInit {
  users:any = [];

  constructor(
    private usersServices: UsersService,

  ) { }

  ngOnInit(): void {
    this._getUsers();
  }


  private _getUsers() {
    this.usersServices.getUsers().subscribe((users) => {
      this.users = users;
    })
  }
}
