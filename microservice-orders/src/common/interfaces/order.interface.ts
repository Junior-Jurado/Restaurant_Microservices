import { IRecipe } from "./recipe.interface";

export interface IOrder {
    _id?: string,
    orderNumber: number;
    recipe: IRecipe;
    state: string;
    tableNumber: number;
}
