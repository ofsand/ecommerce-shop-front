import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';

export const usersRoutes: Route[] = [
  {
    path: '/login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(usersRoutes), CommonModule, RouterModule],
  declarations: [
    LoginComponent
  ],
  exports: [
    LoginComponent
  ],
})
export class UsersModule {}
