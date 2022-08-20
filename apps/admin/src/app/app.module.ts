import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ShellComponent } from './shared/shell/shell.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { CategoryListComponent } from './categories/category-list/category-list.component';

import {CardModule} from 'primeng/card';
import {ToolbarModule} from 'primeng/toolbar';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import { CategoriesService } from '@ecommerce-brands/products';


const UX_MODULE = [
  CardModule, ToolbarModule, ButtonModule, TableModule
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
        path:'products',
        component: DashboardComponent
      },
      {
        path:'users',
        component: DashboardComponent
      }
    ]
  }
];

@NgModule({
  declarations: [AppComponent, DashboardComponent, ShellComponent, SidebarComponent, CategoryListComponent],
  imports: [BrowserModule, RouterModule.forRoot(routes, { initialNavigation: 'enabledNonBlocking'}), UX_MODULE, HttpClientModule],
  providers: [CategoriesService],
  bootstrap: [AppComponent],
})
export class AppModule {}
