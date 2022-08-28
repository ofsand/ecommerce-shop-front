import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from '../../models/category';
import { Product } from '../../models/product';
import { CategoriesService } from '../../services/categories.service';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'products-products-list',
  templateUrl: './products-list.component.html',
  styles: [
  ]
})
export class ProductsListComponent implements OnInit {
  products: Product[] = [];
  categories: Category[] = [];
  currentCategory: any;
  isCategoryPage: boolean;

  constructor(
    private productsService: ProductsService,
    private categoriesService: CategoriesService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      params['id'] ? this._getProducts([params['id']]) : this._getProducts();
      params['id'] ? (
            this.isCategoryPage = true,
            this._getCategory( params['id'])
            ) : 
            (this.isCategoryPage = false);
    });
    this._getCategories();
  }

  private _getProducts(categoriesFilter?: string[]) {
    this.productsService.getProducts(categoriesFilter).subscribe((resProducts) => {
      this.products = resProducts;
    });
  }

  private _getCategories() {
    this.categoriesService.getCategories().subscribe((cats) => {
      this.categories = cats;
    })
  }

  private _getCategory(categoryId: string) {
    this.categoriesService.getCategory(categoryId).subscribe((cat) => {
      this.currentCategory = cat.name;
    })
  }

  categoryFilter() {
    const selectedCategories: any = this.categories
      .filter((category) => category.checked)
      .map((category) => category.id);
    this._getProducts(selectedCategories);
  }
}
