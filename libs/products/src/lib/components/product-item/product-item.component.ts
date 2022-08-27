import { Component, Input, OnInit } from '@angular/core';
import { Product, ProductsService } from '@ecommerce-brands/products';

@Component({
  selector: 'products-product-item',
  templateUrl: './product-item.component.html',
  styles: [
  ]
})
export class ProductItemComponent implements OnInit {
  @Input() product: Product;

  constructor(
    
  ) { }

  ngOnInit(): void {
  }

}
