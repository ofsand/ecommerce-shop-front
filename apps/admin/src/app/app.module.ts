import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


import { AppComponent } from './app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ShellComponent } from './shared/shell/shell.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { CategoryListComponent } from './categories/category-list/category-list.component';

import {CardModule} from 'primeng/card';
import {ToolbarModule} from 'primeng/toolbar';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {ToastModule} from 'primeng/toast';
import {ConfirmDialogModule} from 'primeng/confirmdialog';

import { CategoriesService } from '@ecommerce-brands/products';
import { CategoriesFormComponent } from './categories/categories-form/categories-form.component';
import { MessageService } from 'primeng/api';
import {ConfirmationService} from 'primeng/api';



const UX_MODULE = [
  CardModule, ToolbarModule, ButtonModule, TableModule, ToastModule, ConfirmDialogModule
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
        path:'users',
        component: DashboardComponent
      }
    ]
  }
];

@NgModule({
  declarations: [AppComponent, DashboardComponent, ShellComponent, SidebarComponent, CategoryListComponent, CategoriesFormComponent],
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
