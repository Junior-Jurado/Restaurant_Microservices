import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Order } from '../interfaces/order.interface';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss',
})
export class OrderComponent implements OnInit {
  @Input() order!: Order;
  @Output() addToCartClick = new EventEmitter<Order>();
  constructor() {}
  ngOnInit(): void {}

  onClick(): void {
    this.addToCartClick.emit(this.order);
  }
  previousStates = [
    'Created',
    'Checking ingredients',
    'In preparation',
    'Delivered',
  ];

  isStateActive(state: string): boolean {
    return (
      this.previousStates.indexOf(state) <=
      this.previousStates.indexOf(this.order.state)
    );
  }
}
