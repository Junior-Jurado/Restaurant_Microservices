import { Component, Input, OnInit } from '@angular/core';
import { Shopping } from './interfaces/shopping.interface';
import { ShoppingService } from './services/Shopping.service';
import { tap } from 'rxjs/operators';
@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrl: './shopping.component.scss',
})
export class ShoppingComponent {
  shopping!: Shopping[];
  constructor(private shoppingSvc: ShoppingService) {}
  ngOnInit(): void {
    this.shoppingSvc
      .getShopping()
      .pipe(tap((recipes: Shopping[]) => (this.shopping = recipes)))
      .subscribe();
  }
}
