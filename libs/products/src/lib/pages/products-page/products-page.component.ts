/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem, CartService } from '@ecommerce-brands/orders';
import { Product } from '../../models/product';
import { Review } from '../../models/review';
import { ProductsService } from '../../services/products.service';
import { ReviewsService } from '../../services/reviews.service';

@Component({
  selector: 'products-products-page',
  templateUrl: './products-page.component.html',
  styles: [
  ]
})
export class ProductsPageComponent implements OnInit {
  product: Product;
  ratingVale: any;
  val: number = 1;
  reviews?: Review[];

  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute,
    private cartService: CartService,
    private reviewsService: ReviewsService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if(params['id']) {
        const productId = params['id'];
        this._getProduct(productId);
        this._getReviews(productId);
      }
    })
  }

  addProductToCart() {
    const cartItem: CartItem = {
      productId: this.product.id,
      quantity: this.val
    };

    this.cartService.setCartItem(cartItem);
  }

  
  private _getProduct(productId: string) {
    this.productsService.getProduct(productId).subscribe( product => {
      this.product = product;
      this.ratingVale = product.rating;
    })
  }

  private _getReviews(productId: string) {
    this.reviewsService.getAllReviews().subscribe( reviews => {
      //this.reviews = reviews.filter( prodId => prodId === productId);
      const productsReviews: Review[] = reviews.filter(review => review.product === productId).map(review => review);
      this.reviews = productsReviews;
      
      console.log(this.reviews);
    })
  }

}
