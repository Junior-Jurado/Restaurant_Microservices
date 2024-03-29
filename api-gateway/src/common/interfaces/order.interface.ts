import { IRecipe } from "./recipe.interface";

export interface IOrder {
    orderNumber: number;
    recipe: IRecipe;
    state: string;
    tableNumber: number;
}
