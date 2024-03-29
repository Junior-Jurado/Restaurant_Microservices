import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../interfaces/recipe.interface';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.scss',
})
export class RecipeComponent implements OnInit {
  @Input() recipe!: Recipe;
  @Output() addToCartClick = new EventEmitter<Recipe>();
  constructor() {}
  ngOnInit(): void {}

  onClick(): void {
    this.addToCartClick.emit(this.recipe);
  }
}
