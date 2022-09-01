import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order, OrdersService, STATUS } from '@ecommerce-brands/orders';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';


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
    private orderService: OrdersService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this._getOrders();
  }

  showOrder(orderId: string) {
    this.router.navigateByUrl(`orders/${orderId}`);
  }

  private _getOrders() {
    this.orderService.getOrders().subscribe(orders => {
      this.orders = orders;
    })
  }


  deleteOrder(orderId: string) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this category?',
      header: 'Delete Category',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.orderService.deleteOrder(orderId).subscribe(
          ()=> {
          this._getOrders();
                this.messageService.add({
                  severity:'success', 
                  summary:'Success', 
                  detail:`this Order is been deleted successfully`
                });
          },
          () => {
                this.messageService.add({
                  severity:'error', 
                  summary:'Error', 
                  detail:`Order is not deleted`
                });
        })
      }
  });
    
  }

}
