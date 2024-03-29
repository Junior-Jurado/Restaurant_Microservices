import { Ingredient } from '../../ingredientes/interfaces/ingredient.interface';

export interface Recipe {
  id: string;
  name: string;
  ingredients: Ingredient[];
  description: string;
  image: string;
}
