import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product, ProductsService } from '@ecommerce-brands/products';
import { Review } from 'libs/products/src/lib/models/review';
import { ReviewsService } from 'libs/products/src/lib/services/reviews.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'admin-reviews-list',
  templateUrl: './reviews-list.component.html',
  styles: [
  ]
})
export class ReviewsListComponent implements OnInit {

  reviews: Review[];
  products: Product[] = [];
  selectedProduct: Product;
  noReviews: boolean;

  constructor(
    private reviewsService: ReviewsService,
    private router: Router,
    private productService: ProductsService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this._getAllReviews();
    this._getProductsForDropDownList();
  }

  private _getAllReviews(productFilter?: string) {
    this.reviewsService.getAllReviews(productFilter).subscribe((resReviews) => {
      if(resReviews.length === 0) {
        this.noReviews = true;
        this.reviews = [];
      } else {
        this.reviews = resReviews;
        this.noReviews = false;
      }
      console.log(this.noReviews)
    });
  }

  deleteReview(reviewId: string) {
      this.confirmationService.confirm({
        message: 'Do you want to delete this review ?',
        header: 'Delete review',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.reviewsService.deleteReview(reviewId).subscribe((review: Review)=> {
            this.productFilter();
            this.messageService.add({
                    severity:'success', 
                    summary:'Success', 
                    detail:`Review deleted successfully`
                  });
          },
          (error) => {
            this.messageService.add({
                    severity:'error', 
                    summary:'Error', 
                    detail:`Review is not deleted`
                  });
          })
        }
    });
    
  }

  private _getProductsForDropDownList() {
    this.productService.getProducts().subscribe( products => {
      this.products = products;
    })
  }

  productFilter() {
    const selectedProducts: any = this.products
      .filter((product) => product === this.selectedProduct)
      .map((product) => product.id);
    this._getAllReviews(selectedProducts);
  }

}
