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

    async create(orderDTO: OrderDTO, recipeDTO: RecipeDTO): Promise<IOrder> {
        const newOrder = new this.model({
            ...orderDTO,
            recipe : {
                _id: recipeDTO._id,
                name: recipeDTO.name
            },
        });
        return await newOrder.save();
    }

    async findAll(): Promise<IOrder[]> {
        return await this.model.find();
    }

    async findOne(id: string): Promise<IOrder> {
        return await this.model.findById(id);
    }

    async update(id: string, orderDTO: OrderDTO): Promise<IOrder> {
        const newOrder = { id, ...orderDTO };
        return await this.model.findByIdAndUpdate(id, newOrder, { new: true });
    }

    async delete(id: string) {
        await this.model.findByIdAndDelete(id);
        return {status: HttpStatus.OK, msg: 'Orden eliminada'};
    }
}
