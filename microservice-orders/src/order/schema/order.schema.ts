import * as mongoose from 'mongoose';

export const OrderSchema = new mongoose.Schema({
    orderNumber: { type: Number, required: true },
    recipe: {
        _id: { type: mongoose.Schema.Types.ObjectId, ref: 'recipes' },
        name: { type: String }  
    },
    state: { type: String, default: 'Created' },
    tableNumber: { type: Number, required: true }
}, { timestamps: true });
