import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { IngredientService } from './ingredient.service';
import { IngredientDTO } from './dto/ingredient.dto';
import { ApiTags } from '@nestjs/swagger';
import { ClientProxyRestaurant } from 'src/common/proxy/client-proxy';
import { Observable } from 'rxjs';
import { IIngredient } from 'src/common/interfaces/ingredient.interface';
import { IngredientMSG } from 'src/common/constants';

@ApiTags('ingredients')
@Controller('api/v1/ingredient')
export class IngredientController {

    constructor(private readonly clientProxy: ClientProxyRestaurant) {}

    private _clientProxyIngredient = this.clientProxy.clientProxyIngredients();
    // constructor(private readonly ingredientService: IngredientService) {}

    // @Post()
    // create(@Body() ingredientDTO: IngredientDTO) {
    //     return this.ingredientService.create(ingredientDTO);
    // }

    @Post()
    create(@Body() ingredientDTO: IngredientDTO): Observable<IIngredient> {
        return this._clientProxyIngredient.send(IngredientMSG.CREATE, ingredientDTO);
    }

    // @Get()
    // findAll() {
    //     return this.ingredientService.findAll();
    // }
    @Get()
    findAll(): Observable<IIngredient[]> {
        return this._clientProxyIngredient.send(IngredientMSG.FIND_ALL, '');
    }

    // @Get(':id')
    // findOne(@Param('id') id: string) {
    //     return this.ingredientService.findOne(id);
    // }

    @Get(':id')
    findOne(@Param('id') id: string): Observable<IIngredient> {
        return this._clientProxyIngredient.send(IngredientMSG.FIND_ONE, id);
    }

    @Get(':name')
    findOneByName(@Param('name') name: string): Observable<IIngredient> {
        return this._clientProxyIngredient.send(IngredientMSG.FIND_ONE_BY_NAME, name);
    }
    

    // @Put()
    // update(@Param('id') id: string, @Body() ingredientDTO: IngredientDTO) {
    //     return this.ingredientService.update(id, ingredientDTO);
    // }
    @Put(':id')
    update(@Param('id') id: string, @Body() ingredientDTO: IngredientDTO): Observable<IIngredient> {
        return this._clientProxyIngredient.send(IngredientMSG.UPDATE, { id, ingredientDTO });
    }

    @Delete(':id')
    delete(@Param('id') id: string): Observable<IIngredient> {
        return this._clientProxyIngredient.send(IngredientMSG.DELETE, id);
    }

}
