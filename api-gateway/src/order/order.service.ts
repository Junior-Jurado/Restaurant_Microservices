import { HttpStatus, Injectable } from '@nestjs/common';
import { OrderDTO } from './dto/order.dto';
import { v4 as uuidv4} from 'uuid';
import { IOrder } from 'src/common/interfaces/order.interface';
import { InjectModel } from '@nestjs/mongoose';
import { ORDER } from 'src/common/models/models';
import { Model } from 'mongoose';
import { RecipeDTO } from 'src/recipe/dto/recipe.dto';

@Injectable()
export class OrderService {

    constructor(@InjectModel(ORDER.name) private readonly model:Model<IOrder>) {}

}
