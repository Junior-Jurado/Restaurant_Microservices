import { HttpStatus, Injectable } from '@nestjs/common';
import { RecipeDTO } from './dto/recipe.dto';
import { IRecipe } from 'src/common/interfaces/recipe.interface';
import { InjectModel } from '@nestjs/mongoose';
import { RECIPE } from 'src/common/models/models';
import { Model } from 'mongoose';

@Injectable()
export class RecipeService {

    constructor(@InjectModel(RECIPE.name) private readonly model: Model<IRecipe>) {}

}
