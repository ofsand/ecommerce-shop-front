import { Component, OnInit } from '@angular/core';
import { OrdersService } from '@ecommerce-brands/orders';

@Component({
  selector: 'admin-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private ordersService: OrdersService
  ) { }

  ngOnInit(): void {
    this._getOrdersCount();
  }

  _getOrdersCount() {
    this.ordersService.getOrdersCount().subscribe( data => {
      console.log(data);
    })
  }

}
