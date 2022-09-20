import { Component, OnInit } from '@angular/core';
import { OrdersService } from '@ecommerce-brands/orders';
import { UsersService } from '@ecommerce-brands/users';
import { ProductsService } from '@ecommerce-brands/products';
import { DatePipe } from '@angular/common';
import { Message } from 'primeng/api';

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
  msg = "You are not allowed to edit some data items, so the the content of the website will not be all empty !";
  infoMessage: Message[];

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
      this.infoMessage = [{severity:'info', summary: `Keep in mind`, detail: this.msg}];
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
