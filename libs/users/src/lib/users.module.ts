import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import {CheckboxModule} from 'primeng/checkbox';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), CheckboxModule, InputTextModule, ButtonModule, FormsModule, ReactiveFormsModule],
  declarations: [
    LoginComponent
  ],
  exports: [
    LoginComponent
  ],
})
export class UsersModule {}
