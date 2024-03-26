import * as mongoose from 'mongoose';

export const IngredientSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
    }
)