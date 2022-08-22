import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppComponent } from './app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ShellComponent } from './shared/shell/shell.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { CategoryListComponent } from './pages/categories/category-list/category-list.component';

import {CardModule} from 'primeng/card';
import {ToolbarModule} from 'primeng/toolbar';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {ToastModule} from 'primeng/toast';
import {ConfirmDialogModule} from 'primeng/confirmdialog';

import { CategoriesService } from '@ecommerce-brands/products';
import { CategoriesFormComponent } from './pages/categories/categories-form/categories-form.component';
import { MessageService } from 'primeng/api';
import {ConfirmationService} from 'primeng/api';
import {ColorPickerModule} from 'primeng/colorpicker';
import { ProductsListComponent } from './pages/products/products-list/products-list.component';
import { ProductsFormComponent } from './pages/products/products-form/products-form.component';



const UX_MODULE = [
  CardModule, ToolbarModule, ButtonModule, TableModule, ToastModule, ConfirmDialogModule, ColorPickerModule
]

const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      {
        path:'dashboard',
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
    ]
  }
];

@NgModule({
  declarations: [AppComponent, DashboardComponent, ShellComponent, SidebarComponent, CategoryListComponent, CategoriesFormComponent, ProductsListComponent, ProductsFormComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, { initialNavigation: 'enabledNonBlocking'}),
    UX_MODULE, 
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule],
  providers: [CategoriesService, MessageService, ConfirmationService],
  bootstrap: [AppComponent],
})
export class AppModule {}
