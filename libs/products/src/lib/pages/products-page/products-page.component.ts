import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../models/product';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'products-products-page',
  templateUrl: './products-page.component.html',
  styles: [
  ]
})
export class ProductsPageComponent implements OnInit {
  product: Product;
  ratingVale: any;

  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if(params['id']) {
        const productId = params['id'];
        this._getProduct(productId);
      }
    })
  }

  private _getProduct(productId: string) {
    this.productsService.getProduct(productId).subscribe( product => {
      this.product = product;
      this.ratingVale = product.rating;
    })
  }

}
