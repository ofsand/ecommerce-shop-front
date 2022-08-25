import { Component, OnInit } from '@angular/core';
import { Order, OrdersService } from '@ecommerce-brands/orders';

const STATUS = {
  0: {
    name: 'pending',
    color: 'warning'
  },
  1: {
    name: 'delivered',
    color: 'success'
  },
  2: {
    name: 'failed',
    color: 'danger'
  }
}

@Component({
  selector: 'admin-order-list',
  templateUrl: './order-list.component.html',
  styles: [
  ]
})


export class OrderListComponent implements OnInit {
  orders: Order[];
  orderStatus = STATUS;

  constructor(
    private orderService: OrdersService
  ) { }

  ngOnInit(): void {
    this._getOrders();
  }

  private _getOrders() {
    this.orderService.getOrders().subscribe(orders => {
      this.orders = orders;
    })
  }
}
