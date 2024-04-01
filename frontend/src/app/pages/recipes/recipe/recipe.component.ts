import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../interfaces/recipe.interface';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.scss',
})
export class RecipeComponent implements OnInit {
  portfolioModalId: string = '';
  @Input() recipe!: Recipe;
  @Input() index!: number;
  @Output() addToCartClick = new EventEmitter<Recipe>();
  constructor() {}
  ngOnInit(): void {
    // Generar un ID único para el modal basado en el nombre de la receta
    this.portfolioModalId = 'portfolioModal' + this.index;
  }
}
