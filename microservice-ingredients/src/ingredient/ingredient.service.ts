import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IIngredient } from 'src/common/interfaces/ingredient.interface';
import { INGREDIENT } from 'src/common/models/models';
import { IngredientDTO } from './dto/ingredient.dto';

@Injectable()
export class IngredientService {

    constructor(@InjectModel(INGREDIENT.name) private readonly model:Model <IIngredient>) {}

    async create(ingredientDTO: IngredientDTO): Promise<IIngredient> {
        const newIngredient = new this.model(ingredientDTO);
        return await newIngredient.save();
    }

    async findAll(): Promise<IIngredient[]> {
        return await this.model.find()
    }

    async findOne(id: string): Promise<IIngredient> {
        return await this.model.findById(id);
    }

    async findOneByName(name: string): Promise<IIngredient> {
        return await this.model.findOne({ name });
    }

    async update(id: string, ingredientDTO: IngredientDTO): Promise<IIngredient> {
        return await this.model.findByIdAndUpdate(id, ingredientDTO, { new: true });
    }

    async delete(id: string) {
        await this.model.findByIdAndDelete(id);
        return {
            status: HttpStatus.OK,
            message: 'Deleted'
        }
    }

    
}
