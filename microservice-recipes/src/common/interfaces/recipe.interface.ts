import { IIngredient } from "./ingredient.interface";

export interface IRecipe {
    name: string;
    ingredients: IIngredient[];
    description: string;
    image?: string;
}
