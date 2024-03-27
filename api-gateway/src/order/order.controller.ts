import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { OrderDTO } from './dto/order.dto';
import { ApiTags } from '@nestjs/swagger';
import { ClientProxyRestaurant } from 'src/common/proxy/client-proxy';
import { IOrder } from 'src/common/interfaces/order.interface';
import { OrderMSG, RecipeMSG } from 'src/common/constants';
import { catchError, delay, retryWhen, switchMap } from 'rxjs/operators';
import { timer, throwError, Observable } from 'rxjs';

@ApiTags('orders')
@Controller('api/v1/order')
export class OrderController {

    constructor(private readonly clientProxy: ClientProxyRestaurant) {}

    private _clientProxyOrder = this.clientProxy.clientProxyOrders();
    private _clientProxyRecipe = this.clientProxy.clientProxyRecipes();


    

    @Post()
    async create(@Body() orderDTO: OrderDTO): Promise<Observable<IOrder>> {
        try {
            const recipeAleatory$ = this._clientProxyRecipe.send(RecipeMSG.FIND_ONE_RANDOM, '')
                .pipe(
                    retryWhen(errors => errors.pipe(
                        switchMap(error => {
                            console.error('Error fetching random recipe, retrying...', error);
                            return timer(1000); // Reintentar después de 1 segundo
                        }),
                        delay(1000) // Retrasar cada intento por 1 segundo
                    )),
                    catchError(error => {
                        console.error('Error fetching random recipe:', error);
                        return throwError('Recipe Not Found');
                    })
                )
                .toPromise();

            const recipeAleatory = await recipeAleatory$;

            if (!recipeAleatory) {
                throw new HttpException('Recipe Not Found', HttpStatus.NOT_FOUND);
            }

            const createdOrder = await this._clientProxyOrder.send(OrderMSG.CREATE, { orderDTO, recipeAleatory }).toPromise();

            fetch(`http://localhost:3000/api/v1/recipe/cook/${createdOrder._id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(recipeAleatory),
            }).catch(error => {
                console.error('Error en la petición fetch:', error);
            });

            return createdOrder;

        } catch (error) {
            console.error('Error en la creación de la orden:', error);
            throw new HttpException('Error creating order', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



    @Get()
    findAll(): Observable<IOrder[]> {
        return this._clientProxyOrder.send(OrderMSG.FIND_ALL, '');
    }

    @Get(':id')
    findOne(@Param('id') id: string): Observable<IOrder> {
        return this._clientProxyOrder.send(OrderMSG.FIND_ONE, id);
    }

    @Put(':id')
    update(
        @Param('id') id:string,
        @Body() orderDTO:OrderDTO
    ): Observable<IOrder> {
        return this._clientProxyOrder.send(OrderMSG.UPDATE, { id, orderDTO});
    }


    @Delete(':id')
    delete(@Param('id') id: string): Observable<any> {
        return this._clientProxyOrder.send(OrderMSG.DELETE, id);
    }

}
