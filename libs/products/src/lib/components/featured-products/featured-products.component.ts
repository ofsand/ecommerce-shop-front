import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'products-featured-products',
  templateUrl: './featured-products.component.html',
  styles: []
})
export class FeaturedProductsComponent implements OnInit {
  featuredProducts: Product[] = [];
  count = 2;

  constructor(
    private produitsService: ProductsService
    ) { }

  ngOnInit(): void {
    this._getFeaturedProducts();
  }

  private _getFeaturedProducts() {
    this.produitsService.getFeaturedProducts(5).subscribe((products) => {
      this.featuredProducts = products;
    })
  }

}
