import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(
    private reviewsService: ReviewsService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this._getAllReviews();
  }
  
  private _getAllReviews() {
    this.reviewsService.getAllReviews().subscribe( reviews => {
      this.reviews = reviews;
    })
  }

  deleteReview(reviewId: string) {
      this.confirmationService.confirm({
        message: 'Do you want to delete this review ?',
        header: 'Delete review',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.reviewsService.deleteReview(reviewId).subscribe((review: Review)=> {
            this._getAllReviews();
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

}
