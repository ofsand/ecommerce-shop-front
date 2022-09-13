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
import { CategoriesBannerComponent } from './components/categories-banner/categories-banner.component';
import {CarouselModule} from 'primeng/carousel';
import { ProductsPageComponent } from './pages/products-page/products-page.component';;
import {RatingModule} from 'primeng/rating';
import {InputNumberModule} from 'primeng/inputnumber';
import { UiModule } from '@ecommerce-brands/ui';
import {TabViewModule} from 'primeng/tabview';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import { MessageService } from 'primeng/api';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {ToastModule} from 'primeng/toast';

const routes: Routes = [
  {
    path: 'products',
    component: ProductsListComponent
  },
  {
    path: 'categories/:id',
    component: ProductsListComponent
  },
  {
    path: 'products/:id',
    component: ProductsPageComponent
  },
  {
    path:'products/form/:id/reviews',
    component: ProductsPageComponent
  }
];


@NgModule({
  imports: [
    CommonModule,
    ButtonModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forChild(routes),
    CheckboxModule,
    CarouselModule,
    RatingModule,
    InputNumberModule,
    UiModule,
    TabViewModule,
    MessageModule,
    MessagesModule,
    ReactiveFormsModule,
    FormsModule,
    InputTextareaModule,
    ToastModule
  ],
  providers: [
    MessageService
  ],
  declarations: [
    ProductsSearchComponent,
    FeaturedProductsComponent,
    ProductItemComponent,
    ProductsListComponent,
    CategoriesBannerComponent,
    ProductsPageComponent
  ],
  exports: [ProductsSearchComponent, CategoriesBannerComponent  , FeaturedProductsComponent, ProductItemComponent, ProductsListComponent, ProductsPageComponent]
})
export class ProductsModule {}
