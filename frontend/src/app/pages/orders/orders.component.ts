import { Component, OnInit } from '@angular/core';
import { OrdersService } from './services/orders.service';
import { tap } from 'rxjs/operators';
import { Order } from './interfaces/order.interface';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
})
export class OrdersComponent implements OnInit {
  orders!: Order[];
  constructor(private orderSvc: OrdersService) {}
  ngOnInit(): void {
    this.orderSvc
      .getOrders()
      .pipe(tap((recipes: Order[]) => (this.orders = recipes)))
      .subscribe();
  }
  addToCart(order: Order) {
    console.log('Add to cart', order);
  }
}
