import { Component, OnInit } from '@angular/core';
import { UsersService } from '@ecommerce-brands/users';
import {ConfirmationService, MessageService} from 'primeng/api';
import { Router } from '@angular/router';

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
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this._getUsers();
  }


  private _getUsers() {
    this.usersServices.getUsers().subscribe((users) => {
      this.users = users;
    })
  }

  updateUser(userId: string) {
    this.router.navigateByUrl(`users/form/${userId}`);
  }

  deleteUser(userId: string) {
      this.confirmationService.confirm({
        message: 'Are you sure that you want to proceed?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.usersServices.deleteUser(userId).subscribe(() => {
              this._getUsers();
              this.messageService.add({
                severity:'success',
                summary:'Confirmed',
                detail:'You have Deleted the User'});
            },
            () => {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Product is not deleted!'
              });
            }
            )
        }
    });
    
  }
}
