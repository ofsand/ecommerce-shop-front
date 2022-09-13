import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '@ecommerce-brands/users';
import { CategoriesFormComponent } from './pages/categories/categories-form/categories-form.component';
import { CategoryListComponent } from './pages/categories/category-list/category-list.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { OrderDetailsComponent } from './pages/orders/order-details/order-details.component';
import { OrderListComponent } from './pages/orders/order-list/order-list.component';
import { ProductsFormComponent } from './pages/products/products-form/products-form.component';
import { ProductsListComponent } from './pages/products/products-list/products-list.component';
import { ReviewsListComponent } from './pages/reviews/reviews-list/reviews-list.component';
import { UserFormComponent } from './pages/users/user-form/user-form.component';
import { UserListComponent } from './pages/users/user-list/user-list.component';
import { ShellComponent } from './shared/shell/shell.component';

const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path:'',
        component: DashboardComponent
      },
      {
        path:'categories',
        component: CategoryListComponent
      },
      {
        path:'categories/form',
        component: CategoriesFormComponent
      },
      {
        path:'categories/form/:id',
        component: CategoriesFormComponent
      },
      //Product routes
      {
        path:'products',
        component: ProductsListComponent
      },
      {
        path:'products/form',
        component: ProductsFormComponent
      },
      {
        path:'products/form/:id',
        component: ProductsFormComponent
      },
      //Product routes
      {
        path:'products',
        component: ProductsListComponent
      },
      {
        path:'products/form',
        component: ProductsFormComponent
      },
      //User routes
      {
        path:'users',
        component: UserListComponent
      },
      {
        path:'users/form',
        component: UserFormComponent
      },
      {
        path:'users/form/:id',
        component: UserFormComponent
      },
            //Product routes
      {
        path:'users',
        component: UserListComponent
      },
      {
        path:'users/form',
        component: UserFormComponent
      },
      {
        path:'users/form/:id',
        component: UserFormComponent
      },
      //Orders routes
      {
        path:'orders',
        component: OrderListComponent
      },
      {
        path:'orders/:id',
        component: OrderDetailsComponent
      },
      //Reviews routes
      {
        path:'reviews',
        component: ReviewsListComponent
      },
    ]
  }
];

@NgModule({
  declarations: [],
  imports :[RouterModule.forRoot(routes, { initialNavigation: 'enabledNonBlocking'})],
  exports: [RouterModule]
})

export class AppRoutingModule { }
