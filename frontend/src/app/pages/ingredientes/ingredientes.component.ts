import { Component, OnInit } from '@angular/core';
import { IngredientsService } from './services/ingredients.service';
import { tap } from 'rxjs/operators';
import { Ingredient } from './interfaces/ingredient.interface';

@Component({
  selector: 'app-ingredientes',
  templateUrl: './ingredientes.component.html',
  styleUrl: './ingredientes.component.scss',
})
export class IngredientesComponent implements OnInit {
  ingredients!: Ingredient[];
  constructor(private ingredientSvc: IngredientsService) {}
  ngOnInit(): void {
    this.ingredientSvc
      .getIngredients()
      .pipe(
        tap((ingredients: Ingredient[]) => (this.ingredients = ingredients))
      )
      .subscribe();
  }
  addToCart(ingredient: Ingredient) {
    console.log('Add to cart', ingredient);
  }
}
