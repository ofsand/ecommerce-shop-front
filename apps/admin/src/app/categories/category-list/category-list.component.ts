import { Component, OnInit } from '@angular/core';
import { CategoriesService, Category } from '@ecommerce-brands/products';

@Component({
  selector: 'admin-category-list',
  templateUrl: './category-list.component.html'
})
export class CategoryListComponent implements OnInit {

categories: Category[] = [];

  constructor(private categoriesService: CategoriesService) { }

  ngOnInit(): void {
    this.categoriesService.getCategories().subscribe(cats => {
      this.categories = cats;
    })
  }

}