import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { RecipeDTO } from './dto/recipe.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ClientProxyRestaurant } from 'src/common/proxy/client-proxy';
import { Observable, firstValueFrom } from 'rxjs';
import { IRecipe } from 'src/common/interfaces/recipe.interface';
import { IngredientMSG, RecipeMSG } from 'src/common/constants';

@ApiTags('recipes')
@Controller('api/v1/recipe')
export class RecipeController {

    constructor(private readonly clientProxy: ClientProxyRestaurant){}

    private _clientProxyRecipe = this.clientProxy.clientProxyRecipes();
    private _clientProxyIngredient = this.clientProxy.clientProxyIngredients();

    @Post()
    @ApiOperation({summary: 'Create Recipe Only Name'})
    create(@Body() recipeDTO: RecipeDTO): Observable<IRecipe> {
        return this._clientProxyRecipe.send(RecipeMSG.CREATE, recipeDTO);
    }

    @Get()
    findAll(): Observable<IRecipe[]> {
        return this._clientProxyRecipe.send(RecipeMSG.FIND_ALL, '');
    }

    @Get(':id')
    findOne(@Param('id') id: string): Observable<IRecipe> {
        return this._clientProxyRecipe.send(RecipeMSG.FIND_ONE, id);
    }

    @Get()
    async findOneRandom(): Promise<IRecipe> {
        const recipes$ = this._clientProxyRecipe.send(RecipeMSG.FIND_ALL, '');
        const recipes = await firstValueFrom(recipes$);
        const indice = Math.floor(Math.random() * recipes.length);
        return recipes[indice];
    }

    @Post(':recipeId/ingredient/:ingredientName/quantity/:quantity')
    async addIngredientQuantity(
        @Param('recipeId') recipeId: string,
        @Param('ingredientName') ingredientName: string,
        @Param('quantity') quantity: string
    ) {
        
        const ingredient = await this._clientProxyIngredient
            .send(IngredientMSG.FIND_ONE_BY_NAME, ingredientName)
            .toPromise();

        if (!ingredient) {
            throw new HttpException('Ingredient Not Found', HttpStatus.NOT_FOUND);
        }

        const ingredientId =  ingredient._id.toString();
        const quan =  parseInt(quantity);
        return this._clientProxyRecipe.send(RecipeMSG.ADD_INGREDIENT, 
            {recipeId, ingredientId, quan})
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() recipeDTO: RecipeDTO): Observable<IRecipe> {
        return this._clientProxyRecipe.send(RecipeMSG.UPDATE, { id, recipeDTO});
    }

    @Delete(':id')
    delete(@Param('id') id:string): Observable<IRecipe> {
        return this._clientProxyRecipe.send(RecipeMSG.DELETE, id);
    }

    @Post('cook/:orderId') // Asumiendo que el orderId se espera en la ruta
    async cook(@Body() recipe: RecipeDTO, @Param('orderId') orderId: string): Promise<Observable<boolean>> {
        console.log('Order ID:', orderId);
        const flag = await this._clientProxyIngredient.send(IngredientMSG.GET_INGREDIENTS, recipe.ingredients).toPromise();

        if(flag) {
            try {
                const response = await fetch(`http://localhost:3000/api/v1/order/${orderId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ isDone: true }), 
                });
        
                if (response.ok) {
                    console.log(`Order with ID ${orderId} successfully updated`);
                } else {
                    console.error(`Failed to update order with ID ${orderId}. Status: ${response.status}`);
                }
        
            } catch (error) {
                console.error('Error updating order:', error);
                throw new Error('Failed to update order');
            }
        }
        return flag;
    }


}
