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
  
  basicData: any;
  data: any;
  ordersDates = [];
  ordersTotals = []

  pipe = new DatePipe('en-US');
  
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
    
    this.ordersService.getOrders().subscribe( orders => {
      //orders.forEach(order => order.dateOrdered)
      const dates: Date[] = [];
      orders.map(order => dates.push(order.dateOrdered));
      dates.forEach( d => this.ordersDates.push(this.pipe.transform(d, 'shortDate')));
      console.log(this.ordersDates.reverse());
      orders.map(order => this.ordersTotals.push(order.totalPrice));
      console.log(this.ordersTotals)
    })
    //
    this.basicData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
          {
              label: 'First Dataset',
              data: [65, 59, 80, 81, 56, 55, 40],
              fill: false,
              borderColor: '#42A5F5',
              tension: .4
          },
          {
              label: 'Second Dataset',
              data: [28, 48, 40, 19, 86, 27, 90],
              fill: false,
              borderColor: '#FFA726',
              tension: .4
          }
      ]
  };
  //
  this.data = {
    datasets: [{
        data: [
            11,
            16,
            7,
            3,
            14
        ],
        backgroundColor: [
            "#42A5F5",
            "#66BB6A",
            "#FFA726",
            "#26C6DA",
            "#7E57C2"
        ],
        label: 'My dataset'
    }],
    labels: [
        "Red",
        "Green",
        "Yellow",
        "Grey",
        "Blue"
    ]
};

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
