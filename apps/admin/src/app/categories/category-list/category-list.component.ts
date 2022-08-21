/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesService, Category } from '@ecommerce-brands/products';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';

@Component({
  selector: 'admin-category-list',
  templateUrl: './category-list.component.html'
})
export class CategoryListComponent implements OnInit {

categories: Category[] = [];

  constructor(
      private router: Router,
      private confirmationService: ConfirmationService,
      private categoriesService: CategoriesService, 
      private messageService: MessageService
      ) {}

  ngOnInit(): void {
    this._getCategories();
  }

  updateCategory(categoryId: string) {
    this.router.navigateByUrl(`categories/form/${categoryId}`);
  }

  deleteCategory(categoryId: string) {

    this.confirmationService.confirm({
      message: 'Do you want to delete this category?',
      header: 'Delete Category',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.categoriesService.deleteCategory(categoryId).subscribe((category: Category)=> {
          this._getCategories();
          this.messageService.add({
                  severity:'success', 
                  summary:'Success', 
                  detail:`Category ${category.name} deleted successfully`
                });
        },
        (error) => {
          this.messageService.add({
                  severity:'error', 
                  summary:'Error', 
                  detail:`Category is not deleted`
                });
        })
      }
  });

  }

  private _getCategories() {
    this.categoriesService.getCategories().subscribe(cats => {
      this.categories = cats;
    });
  }

}