import { IRecipe } from "./recipe.interface";

export interface IOrder {
    recipe: IRecipe;
    state: string;
    tableNumber: number;
}
