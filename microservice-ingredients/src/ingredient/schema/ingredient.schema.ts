import * as mongoose from 'mongoose';

export const IngredientSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        description: { type: String, required: true },
        image: { type: String }
    }
)


export const ShoppingHistorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
}, { timestamps: true });