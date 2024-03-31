import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { IngredientDTO } from './dto/ingredient.dto';
import { ApiTags } from '@nestjs/swagger';
import { ClientProxyRestaurant } from 'src/common/proxy/client-proxy';
import { Observable } from 'rxjs';
import { IIngredient } from 'src/common/interfaces/ingredient.interface';
import { IngredientMSG } from 'src/common/constants';
import { IShoppingHistory } from 'src/common/interfaces/shoppingHistory.interface';

@ApiTags('ingredients')
@Controller('api/v1/ingredient')
export class IngredientController {

    constructor(private readonly clientProxy: ClientProxyRestaurant) {}

    private _clientProxyIngredient = this.clientProxy.clientProxyIngredients();

    @Post()
    create(@Body() ingredientDTO: IngredientDTO): Observable<IIngredient> {
        return this._clientProxyIngredient.send(IngredientMSG.CREATE, ingredientDTO);
    }

    @Get()
    findAll(): Observable<IIngredient[]> {
        return this._clientProxyIngredient.send(IngredientMSG.FIND_ALL, '');
    }

    @Put('update5')
    update5(): Observable<IIngredient[]> {
        return this._clientProxyIngredient.send(IngredientMSG.UPDATE5, '');
    }

    @Delete('shopping')
    deleteAllShopping(): Observable<any> {
        return this._clientProxyIngredient.send(IngredientMSG.DELETE_SHOPPING, '');
    }

    @Get('shopping')
    findShoppingIngredients(): Observable<IShoppingHistory[]> {
        return this._clientProxyIngredient.send(IngredientMSG.GET_SHOPPING_INGREDIENTS, '');
    }

    @Get(':id')
    findOne(@Param('id') id: string): Observable<IIngredient> {
        return this._clientProxyIngredient.send(IngredientMSG.FIND_ONE, id);
    }

    @Get(':name')
    findOneByName(@Param('name') name: string): Observable<IIngredient> {
        return this._clientProxyIngredient.send(IngredientMSG.FIND_ONE_BY_NAME, name);
    }
    
    @Put(':id')
    update(@Param('id') id: string, @Body() ingredientDTO: IngredientDTO): Observable<IIngredient> {
        return this._clientProxyIngredient.send(IngredientMSG.UPDATE, { id, ingredientDTO });
    }

    @Delete(':id')
    delete(@Param('id') id: string): Observable<IIngredient> {
        return this._clientProxyIngredient.send(IngredientMSG.DELETE, id);
    }

}
