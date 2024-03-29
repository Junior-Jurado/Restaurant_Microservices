import { Component, OnInit } from '@angular/core';
import { RecipesService } from './services/recipes.service';
import { tap } from 'rxjs/operators';
import { Recipe } from './interfaces/recipe.interface';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.scss',
})
export class RecipesComponent implements OnInit {
  recipes!: Recipe[];
  constructor(private recipeSvc: RecipesService) {}
  ngOnInit(): void {
    this.recipeSvc
      .getRecipes()
      .pipe(tap((recipes: Recipe[]) => (this.recipes = recipes)))
      .subscribe();
  }
  addToCart(recipe: Recipe) {
    console.log('Add to cart', recipe);
  }
}
