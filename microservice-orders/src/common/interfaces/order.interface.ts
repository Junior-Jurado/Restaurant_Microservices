import { IRecipe } from "./recipe.interface";

export interface IOrder {
    recipe: IRecipe;
    isDone?: boolean;
}
