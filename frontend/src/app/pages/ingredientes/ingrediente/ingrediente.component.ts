import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Ingredient } from '../interfaces/ingredient.interface';

@Component({
  selector: 'app-ingrediente',
  templateUrl: './ingrediente.component.html',
  styleUrl: './ingrediente.component.scss',
})
export class IngredienteComponent implements OnInit {
  @Input() ingredient!: Ingredient;
  @Output() addToCartClick = new EventEmitter<Ingredient>();
  constructor() {}
  ngOnInit(): void {}

  onClick(): void {
    this.addToCartClick.emit(this.ingredient);
  }
}
