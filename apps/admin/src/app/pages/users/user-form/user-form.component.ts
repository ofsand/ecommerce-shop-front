import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UsersService, User } from '@ecommerce-brands/products';
import { Location } from '@angular/common';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';

@Component({
  selector: 'admin-user-form',
  templateUrl: './user-form.component.html',
  styles: [
  ]
})
export class UserFormComponent implements OnInit {

  currentUserId: string;
  editmode = false;
  form: FormGroup;
  isSubmitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private usersService: UsersService,
    private location: Location,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this._checkEditMode();
  }

  onSubmit() {
    this.isSubmitted = true;

    if(this.form.invalid) return;

    const userFormData = new FormData();

    if(this.editmode) {
      this._updateUser(userFormData);
    }else {
      this._addUser(userFormData);
    }
  }

  private _checkEditMode() {
    this.route.params.subscribe(params => {
      if(params['id']) {
        this.editmode = true;
        this.currentUserId = params['id'];
        this.usersService.getUser(params['id']).subscribe((user) => {
          this.form.controls['name'].setValue(user.name);
          this.form.controls['email'].setValue(user.email);
          this.form.controls['phone'].setValue(user.phone);
          this.form.controls['city'].setValue(user.city);
          this.form.controls['address'].setValue(user.address);
          this.form.controls['isAdmin'].setValue(user.isAdmin);
        });
      }
    }); 

  }

  private _initForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      city: ['', Validators.required],
      address: ['', Validators.required],
      isAdmin: ['', Validators.required],
    })
  }

  private _updateUser(userData: FormData) {
    this.usersService.updateUser(userData, this.currentUserId).subscribe( 
      (user) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `User ${user.name} is updated!`
        });
        timer(2000)
          .toPromise()
          .then(() => {
            this.location.back();
          });
      },
      () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'User is not updated!'
          });
      }
    );
  }


  private _addUser(userData: FormData) {
    this.usersService.addUser(userData).subscribe(
      (user: User) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `User ${user.name} is created!`
        });
        timer(2000)
          .toPromise()
          .then(() => {
            this.location.back();
          });
      },
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'User is not created!'
        });
      }
    );
  }
}
