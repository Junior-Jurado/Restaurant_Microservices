import * as mongoose from 'mongoose';

const IngredientSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId, ref: 'ingredients' },
    quantity: { type: Number, required: true }
});

export const RecipeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    ingredients: [IngredientSchema] ,
    image: { type: String },
    description: { type: String, required: true },
});

RecipeSchema.index({ name: 1 }, { unique: true });
