import { IIngredient } from "./ingredient.interface";

export interface IRecipe {
    _id?: string;
    name: string;
    ingredients?: IIngredient[];
}
