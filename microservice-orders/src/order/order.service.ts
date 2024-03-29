import { HttpStatus, Injectable } from '@nestjs/common';
import { OrderDTO } from './dto/order.dto';
import { v4 as uuidv4} from 'uuid';
import { IOrder } from 'src/common/interfaces/order.interface';
import { InjectModel } from '@nestjs/mongoose';
import { ORDER } from 'src/common/models/models';
import { Model } from 'mongoose';
import { RecipeDTO } from './dto/recipe.dto';

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

    async findNumberOrder(numberOrder: string): Promise<IOrder> {
        try {
            const numero = parseInt(numberOrder, 10);
            const order = await this.model.findOne({ orderNumber: numero });
            return order;
        } catch (error) {
            console.error('Error al buscar por número de orden:', error);
            throw new Error('Error al buscar por número de orden');
        }
    }

    async update(id: string, orderDTO: OrderDTO): Promise<IOrder> {
        const newOrder = { id, ...orderDTO };
        return await this.model.findByIdAndUpdate(id, newOrder, { new: true });
    }

    async delete(id: string) {
        await this.model.findByIdAndDelete(id);
        return {status: HttpStatus.OK, msg: 'Orden eliminada'};
    }

    async deleteAll() {
        try {
            const orders = await this.model.find();
            for (const order of orders) {
                await this.delete(order._id);
            }
    
            return { status: HttpStatus.OK, msg: `${orders.length} órdenes eliminadas` };
        } catch (error) {
            console.error('Error al eliminar todas las órdenes:', error);
            throw new Error('Error al eliminar todas las órdenes');
        }
    }

    async findOrdersNotDelivered(): Promise<IOrder[]> {
        try {
            const orders = await this.model.find({ state: { $ne: 'Delivered' } });
            return orders;
        } catch (error) {
            console.error('Error al buscar órdenes no entregadas:', error);
            throw new Error('Error al buscar órdenes no entregadas');
        }
    }

    async findOrdersDelivered(): Promise<IOrder[]> {
        try {
            const orders = await this.model.find({ state: 'Delivered' });
            return orders;
        } catch (error) {
            console.error('Error al buscar órdenes entregadas:', error);
            throw new Error('Error al buscar órdenes entregadas');
        }
    }
}
