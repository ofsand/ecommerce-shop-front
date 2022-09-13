/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @nrwl/nx/enforce-module-boundaries */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CartItem, CartService } from '@ecommerce-brands/orders';
import { LocalStorageService, User, UsersService } from '@ecommerce-brands/users';
import { Message } from 'primeng/api';
import { Product } from '../../models/product';
import { Review } from '../../models/review';
import { ProductsService } from '../../services/products.service';
import { ReviewsService } from '../../services/reviews.service';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';

@Component({
  selector: 'products-products-page',
  templateUrl: './products-page.component.html',
  styles: [
  ]
})
export class ProductsPageComponent implements OnInit {
  product?: Product;
  val: number = 1;
  reviews?: Review[];
  userId: string;
  isGuest: boolean
  msg = "To be able to leave a comment you should log in with your Personal account, in case you don't have one, we invite you to create an account. i'ts easy and quick :) !";
  warningMessage: Message[];
  isAuth: boolean;
  reviewForm: FormGroup;
  showForm = false;
  isSubmitted : boolean;
  autoResize = true;
  currentUser: User;
  //ratingValue is the value got from the rating stars Event
  ratingValue: number;
  productRatingValue: number;
  numReviews: number;

  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute,
    private cartService: CartService,
    private reviewsService: ReviewsService,
    private localStorageService: LocalStorageService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private usersServices: UsersService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if(params['id']) {
        const productId = params['id'];
        this._getProduct(productId);
        this._getReviews(productId);
        this._initReviewForm();
        this.getAuthenticatedUser();
        //this.updateProductsRating();
        this.productRatingValue = 0;
        this.numReviews = 0;
      }
    })
    this.warningMessage = [{severity:'warn', summary: `You can't leave a review`, detail: this.msg}];
  }

  addProductToCart() {
    const cartItem: CartItem = {
      productId: this.product?.id,
      quantity: this.val
    };

    this.cartService.setCartItem(cartItem);
  }

  
  private _getProduct(productId: string) {
    this.productsService.getProduct(productId).subscribe( product => {
      this.product = product;
    })
  }

  //We are getting all reviews at once then filter to find the reviews related to the current product, which is not a good practice at all !!!!
  private _getReviews(productId: string) {
    this.reviewsService.getAllReviews().subscribe( reviews => {
      //this.reviews = reviews.filter( prodId => prodId === productId);
      const productsReviews: Review[] = reviews.filter(review => review.product === productId).map(review => review);
      //console.log(productsReviews);
      if(productsReviews)  
      {
        this.reviews = productsReviews;
        let productsRat = 0;
        productsReviews.forEach(review => productsRat += review?.rating);
        this.numReviews = productsReviews.length;
        //console.log(this.numReviews, productsRat);
        productsRat = productsRat / this.numReviews
        //console.log(productsRat);
        this.productRatingValue = productsRat;
      }
      else {
        this.numReviews = 0;
        this.reviews = [];
        this.productRatingValue = 0;
      }
    })
  }

  private getAuthenticatedUser() {
    const token = this.localStorageService.getToken()
    if(token) {
      const tokenDecode = JSON.parse(atob(token.split(".")[1]));
      if(!this._tokenExpired(tokenDecode.exp)) {
            this.isAuth = true;
            this.userId = tokenDecode.id;
            this.isGuest = this._isGuest(tokenDecode.id);
            this.usersServices.getUser(this.userId).subscribe( 
              (user) => {
                this.currentUser = user;
              })
        }
    }else {
      this.isAuth = false;
    }
  }

  private _tokenExpired(expiration: number): boolean {
    return Math.floor(new Date().getTime() / 1000) >= expiration;
  }

  private _isGuest(userId: string) {
    if(userId === '6310cb9d40899c7e2c30f890') {
      return true;
    }else {
      return false;
    }
  }

  showReviewForm() {
    this.showForm = true;
  }

  private _initReviewForm() {
    this.reviewForm = this.formBuilder.group({
      text: ['', Validators.required]
    });
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.reviewForm.invalid) {
      return;
    }

    const review: Review = {
      reviewer: this.currentUser?.name,
      text: this.reviewForm.controls['text'].value,
      product: this.product,
      user: this.currentUser,
      rating: this.ratingValue
    };
    this.productsService.createReview(this.product?.id, review).subscribe(      
      (review) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `Your review is well Added`,
        });
        timer(1000)
          .toPromise()
          .then(() => {
            this._getReviews(this.product?.id);
            this.cancelForm();
            this.updateProductsRating();
          });
      },
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Your review is not added'
        });
      })
  }

  cancelForm() {
    this.showForm = false;
  }

  handleRate(event) {
    this.ratingValue = event.value;
  }

  updateProductsRating() {

    const productFormData = new FormData();
    productFormData.append("rating", `${this.productRatingValue}`);
    productFormData.append("numReviews", `${this.numReviews}`);
    productFormData.append("category", `${this.product?.category?.id}`);
    
    this.productsService.updateProduct(productFormData, this.product?.id).subscribe();
  }
  
}
