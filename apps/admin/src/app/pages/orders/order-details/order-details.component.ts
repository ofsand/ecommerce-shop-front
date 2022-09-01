import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Order, OrdersService, STATUS } from '@ecommerce-brands/orders';

@Component({
  selector: 'admin-order-details',
  templateUrl: './order-details.component.html',
  styles: [
  ]
})
export class OrderDetailsComponent implements OnInit {
  order: Order;
  orderStatuses: any;
  selectedStatus: any;

  constructor(
    private ordersService: OrdersService,
    private route: ActivatedRoute,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this._mapOrderStatus();
    this._showOrder();
  }

  private _mapOrderStatus() {
    this.orderStatuses = Object.keys(STATUS).map((key) => {
      return {
        id: key,
        name: STATUS[key].name
      };
    });
  }
  

  private _showOrder() {
    this.route.params.subscribe((params) => {
      if(params['id']) {
        this.ordersService.getOrder(params['id']).subscribe((order) => {
          this.order = order;
          this.selectedStatus = order.status;
        })
      }else {
        console.log("here");
      }
    })
  }

  onStatusChange(event) {
    this.ordersService.updateOrder({status: event.value}, this.order.id).subscribe(() => {
      this.messageService.add({
        severity:'success',
        summary:'Success', 
        detail:`Status is modified`
      });

      },
      () => {
      this.messageService.add({
              severity:'error', 
              summary:'Error', 
              detail:`Status is not modified`
            });
      });
  }

}
