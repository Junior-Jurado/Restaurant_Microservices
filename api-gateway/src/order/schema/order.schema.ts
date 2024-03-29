import * as mongoose from 'mongoose';

export const OrderSchema = new mongoose.Schema({
    recipe: {
        _id: { type: mongoose.Schema.Types.ObjectId, ref: 'recipes' },
        name: { type: String }  
    },
    isDone: { type: Boolean, default: false }
}, { timestamps: true });
