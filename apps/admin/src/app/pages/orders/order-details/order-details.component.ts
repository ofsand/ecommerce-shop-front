import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order, OrdersService } from '@ecommerce-brands/orders';

interface Status {
  name: string,
  num: number
}

@Component({
  selector: 'admin-order-details',
  templateUrl: './order-details.component.html',
  styles: [
  ]
})
export class OrderDetailsComponent implements OnInit {
  order: Order;
  status: Status[];
  selectedStatus: number;

  constructor(
    private ordersService: OrdersService,
    private route: ActivatedRoute
  ) {
    this.status = [
      {name: 'Pending', num: 0},
      {name: 'Delivered', num: 1},
      {name: 'Failed', num: 2 }
  ];
  }

  ngOnInit(): void {
    this._showOrder();
  }

  private _showOrder() {
    this.route.params.subscribe((params) => {
      if(params['id']) {
        this.ordersService.getOrder(params['id']).subscribe((order) => {
          this.order = order;
          console.log(order);
        })
      }
    })
  }

}
