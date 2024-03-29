import { Recipe } from '../../recipes/interfaces/recipe.interface';

export interface Order {
  orderNumber: number;
  recipe: Recipe;
  state: string;
  tableNumber: number;
}
