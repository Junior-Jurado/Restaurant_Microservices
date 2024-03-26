import { HttpStatus, Injectable } from '@nestjs/common';
import { RecipeDTO } from './dto/recipe.dto';
import { IRecipe } from 'src/common/interfaces/recipe.interface';
import { InjectModel } from '@nestjs/mongoose';
import { RECIPE } from 'src/common/models/models';
import { Model } from 'mongoose';

@Injectable()
export class RecipeService {

    constructor(@InjectModel(RECIPE.name) private readonly model: Model<IRecipe>) {}

    async create(recipeDTO: RecipeDTO): Promise<IRecipe> {
        const newRecipe = new this.model(recipeDTO);
        return await newRecipe.save();
    }

    async findAll(): Promise<IRecipe[]> {
        return await this.model.find();
    }

    async findOne(id: string): Promise<IRecipe> {
        return await this.model.findById(id);
    }

    async update(id: string, recipeDTO: RecipeDTO): Promise<IRecipe> {
        return await this.model.findByIdAndUpdate(id, recipeDTO, { new: true });
    }

    async delete(id: string) {
        await this.model.findByIdAndDelete(id);
        return {
            status: HttpStatus.OK,
            message: 'Deleted'
        }
    }

    // async addIngredient(recipeId: string, ingredientId:string): Promise <IRecipe> {
    //     return await this.model.findByIdAndUpdate(
    //         recipeId, 
    //         {
    //             $addToSet: {ingredients: ingredientId}
    //         },
    //         { new: true }
    //     );
    // }

    async addIngredientQuantity(recipeId: string, ingredientId:string, quant: number): Promise <IRecipe> {
        return await this.model.findByIdAndUpdate(
            recipeId, 
            {
                $addToSet: {
                    ingredients: {
                        _id: ingredientId,
                        quantity: quant
                    }
                }
            },
            { new: true }
        ).populate('ingredients');
    }

    async findOneByName(name: string): Promise<IRecipe> {
        return await this.model.findOne({ name });
    }

    async findOneRandom(): Promise<IRecipe> {
        const recipes = await this.model.find();
        const indice = Math.floor(Math.random() * recipes.length);
        return recipes[indice];
    }


}
