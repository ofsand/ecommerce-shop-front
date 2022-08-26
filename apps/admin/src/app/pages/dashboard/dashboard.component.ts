import { Component, OnInit } from '@angular/core';
import { OrdersService } from '@ecommerce-brands/orders';

@Component({
  selector: 'admin-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: []
})
export class DashboardComponent implements OnInit {
  ordersCount: number;

  constructor(
    private ordersService: OrdersService
  ) { }

  ngOnInit(): void {
    this._getOrdersCount();
  }

  _getOrdersCount() {
    this.ordersService.getOrdersCount().subscribe( orderspCount => {
      this.ordersCount = orderspCount;
    })
  }

}
