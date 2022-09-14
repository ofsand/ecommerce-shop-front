import { Component, OnInit } from '@angular/core';
import { OrdersService } from '@ecommerce-brands/orders';
import { UsersService } from '@ecommerce-brands/users';
import { ProductsService } from '@ecommerce-brands/products';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'admin-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: []
})
export class DashboardComponent implements OnInit {
  ordersCount: number;
  usersCount: number;
  productsCount: number;
  totalSales: number;

  constructor(
    private ordersService: OrdersService,
    private usersService: UsersService,
    private productsService: ProductsService
    ) { }
    
    ngOnInit(): void {
      this._getOrdersCount();
      this._getUsersCount();
      this._getProductsCount();
      this._getTotalSales();
  }

  _getUsersCount() {
    this.usersService.getUserCount().subscribe( usersCount => {
      this.usersCount = usersCount;
    })
  }

  _getOrdersCount() {
    this.ordersService.getOrdersCount().subscribe( ordersCount => {
      this.ordersCount = ordersCount;
    })
  }
  
  _getProductsCount() {
    this.productsService.getProductsCount().subscribe( productsCount => {
      this.productsCount = productsCount;
    })
  }

  _getTotalSales() {
    this.ordersService.getTotalSales().subscribe( totalSales => {
      this.totalSales = totalSales;
    })
  }


}
