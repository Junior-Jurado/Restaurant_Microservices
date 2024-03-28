export interface IIngredient extends Document{
    _id?: string;
    name: string;
    quantity: number;
    description: string;
    image?: string;
}