export interface IShoppingHistory extends Document{
    _id?: string;
    name: string;
    quantity: number;
    image?: string;
}