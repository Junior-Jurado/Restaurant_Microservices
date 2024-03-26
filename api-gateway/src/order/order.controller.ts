import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderDTO } from './dto/order.dto';
import { RecipeService } from 'src/recipe/recipe.service';
import { ApiTags } from '@nestjs/swagger';
import { ClientProxyRestaurant } from 'src/common/proxy/client-proxy';
import { Observable } from 'rxjs';
import { IOrder } from 'src/common/interfaces/order.interface';
import { OrderMSG, RecipeMSG } from 'src/common/constants';

@ApiTags('orders')
@Controller('api/v1/order')
export class OrderController {

    // constructor(
    //         private readonly orderService: OrderService,
    //         private readonly recipeService: RecipeService
    //     ) {
    // }

    constructor(private readonly clientProxy: ClientProxyRestaurant) {}

    private _clientProxyOrder = this.clientProxy.clientProxyOrders();
    private _clientProxyRecipe = this.clientProxy.clientProxyRecipes();

    // @Post()
    // async create(@Body() orderDTO: OrderDTO) {
    //     const recipeAleatory = await this.recipeService.findOneRandom();
    //     if(!recipeAleatory) 
    //         throw new HttpException('Recipe Not Found', HttpStatus.NOT_FOUND);

    //     return this.orderService.create(orderDTO, recipeAleatory)
    // }

    @Post()
    async create(@Body() orderDTO: OrderDTO): Promise<Observable<IOrder>> {
        const recipeAleatory = await this._clientProxyRecipe.send(RecipeMSG.FIND_ONE, '');
        if(!recipeAleatory) 
            throw new HttpException('Recipe Not Found', HttpStatus.NOT_FOUND);

        return this._clientProxyOrder.send(OrderMSG.CREATE, orderDTO);
    }

    @Get()
    findAll(): Observable<IOrder[]> {
        return this._clientProxyOrder.send(OrderMSG.FIND_ALL, '');
    }

    // @Get(':id')
    // findOne(@Param('id') id: string) {
    //     return this.orderService.findOne(id);
    // }

    @Get(':id')
    findOne(@Param('id') id: string): Observable<IOrder> {
        return this._clientProxyOrder.send(OrderMSG.FIND_ONE, id);
    }

    // @Put(':id')
    // update(
    //     @Param('id') id:string,
    //     @Body() orderDTO:OrderDTO
    // ) {
    //     return this.orderService.update(id, orderDTO);
    // }
    @Put(':id')
    update(
        @Param('id') id:string,
        @Body() orderDTO:OrderDTO
    ): Observable<IOrder> {
        return this._clientProxyOrder.send(OrderMSG.UPDATE, { id, orderDTO});
    }

    // @Delete(':id')
    // delete(@Param('id') id: string) {
    //     return this.orderService.delete(id)
    // }

    @Delete(':id')
    delete(@Param('id') id: string): Observable<any> {
        return this._clientProxyOrder.send(OrderMSG.DELETE, id);
    }



}
