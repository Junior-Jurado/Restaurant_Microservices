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

    async getIngredients(ingredients: IngredientDTO[]):Promise<boolean> {
        for (const ingredient of ingredients) {
            try {
                const ingredientDB = await this.findOne(ingredient._id);
                const idIngredient = ingredient._id;
                if (ingredientDB.quantity >= ingredient.quantity) {
                    ingredientDB.quantity -= ingredient.quantity;
                    await this.update(idIngredient, ingredientDB);
                } else {
                    while(ingredientDB.quantity < ingredient.quantity) {
                        const response = await fetch(`https://microservices-utadeo-arq-fea471e6a9d4.herokuapp.com/api/v1/software-architecture/market-place?ingredient=${ingredientDB.name.toLowerCase()}`, {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                        });
            
                        if (!response.ok) {
                            throw new Error(`Failed to fetch ${ingredient} information`);
                        }
        
                        const responseData = await response.json();
    
                        const ingredientName = Object.keys(responseData.data)[0];
                        const ingredientQuantity = responseData.data[ingredientName];

                        
                        ingredientDB.quantity += ingredientQuantity;
                        await this.update(idIngredient, ingredientDB);
                    }
                    ingredientDB.quantity -= ingredient.quantity;
                    await this.update(idIngredient, ingredientDB)
                }
            } catch (error) {
                console.error('Error fetching ingredient:', error);
                return false; 
            }
        }
        
        return true;
    }

    
}
