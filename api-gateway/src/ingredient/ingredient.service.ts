import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IIngredient } from 'src/common/interfaces/ingredient.interface';
import { INGREDIENT } from 'src/common/models/models';
import { IngredientDTO } from './dto/ingredient.dto';

@Injectable()
export class IngredientService {

    constructor(@InjectModel(INGREDIENT.name) private readonly model:Model <IIngredient>) {}

}
