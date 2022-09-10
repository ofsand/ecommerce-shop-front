import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserLoginComponent } from './pages/user-login/user-login.component';
import { ProfileComponent } from './pages/profile/profile.component';

import {FieldsetModule} from 'primeng/fieldset';
import {TabViewModule} from 'primeng/tabview';
import { TagModule } from 'primeng/tag';
import {ToolbarModule} from 'primeng/toolbar';
import {InputMaskModule} from 'primeng/inputmask';
import {InputNumberModule} from 'primeng/inputnumber';
import {TableModule} from 'primeng/table';


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'user-login',
    component: UserLoginComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CheckboxModule,
    InputTextModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    FieldsetModule,
    TabViewModule,
    TagModule,
    ToolbarModule,
    InputMaskModule,
    InputNumberModule,
    TableModule

  ],
  declarations: [LoginComponent, UserLoginComponent, ProfileComponent],
  exports: [LoginComponent, UserLoginComponent, ProfileComponent],
  providers: [],
})
export class UsersModule {}
