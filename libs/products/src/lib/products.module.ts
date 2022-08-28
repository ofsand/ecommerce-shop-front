import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsSearchComponent } from './components/products-search/products-search.component';
import { FeaturedProductsComponent } from './components/featured-products/featured-products.component';
import { ProductItemComponent } from './components/product-item/product-item.component';
import {ButtonModule} from 'primeng/button';
import { HttpClientModule } from '@angular/common/http';
import { ProductsListComponent } from './pages/products-list/products-list.component';
import { RouterModule, Routes } from '@angular/router';
import {CheckboxModule} from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { CategoriesBannerComponent } from './components/categories-banner/categories-banner.component';

const routes: Routes = [
  {
    path: 'products',
    component: ProductsListComponent
  },
  {
    path: 'categories/:id',
    component: ProductsListComponent
  },
];


@NgModule({
  imports: [
    CommonModule,
    ButtonModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forChild(routes),
    CheckboxModule]
    ,
  declarations: [
    ProductsSearchComponent,
    FeaturedProductsComponent,
    ProductItemComponent,
    ProductsListComponent,
    CategoriesBannerComponent
  ],
  exports: [ProductsSearchComponent, CategoriesBannerComponent  , FeaturedProductsComponent, ProductItemComponent, ProductsListComponent]
})
export class ProductsModule {}
