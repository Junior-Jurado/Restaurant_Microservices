import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { RecipeDTO } from './dto/recipe.dto';
import { RecipeService } from './recipe.service';
import { IngredientService } from 'src/ingredient/ingredient.service';
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

    // constructor(private readonly recipeService: RecipeService, 
    //             private readonly ingredientService: IngredientService) {}

    // @Post()
    // @ApiOperation({summary: 'Create Recipe Only Name'})
    // create(@Body() recipeDTO: RecipeDTO) {
    //     return this.recipeService.create(recipeDTO);
    // }
    @Post()
    @ApiOperation({summary: 'Create Recipe Only Name'})
    create(@Body() recipeDTO: RecipeDTO): Observable<IRecipe> {
        return this._clientProxyRecipe.send(RecipeMSG.CREATE, recipeDTO);
    }


    // @Get()
    // findAll() {
    //     return this.recipeService.findAll();
    // }

    @Get()
    findAll(): Observable<IRecipe[]> {
        return this._clientProxyRecipe.send(RecipeMSG.FIND_ALL, '');
    }

    // @Get(':id')
    // findOne(@Param('id') id: string) {
    //     return this.recipeService.findOne(id);
    // }

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

    // @Put(':id')
    // update(@Param('id') id: string, @Body() recipeDTO: RecipeDTO) {
    //     return this.recipeService.update(id, recipeDTO);
    // }
    @Put(':id')
    update(@Param('id') id: string, @Body() recipeDTO: RecipeDTO): Observable<IRecipe> {
        return this._clientProxyRecipe.send(RecipeMSG.UPDATE, { id, recipeDTO});
    }

    // @Delete(':id')
    // delete(@Param('id') id:string) {
    //     return this.recipeService.delete(id);
    // }
    @Delete(':id')
    delete(@Param('id') id:string): Observable<IRecipe> {
        return this._clientProxyRecipe.send(RecipeMSG.DELETE, id);
    }

    // @Post(':recipeId/ingredient/:ingredientId')
    // async addIngredient(@Param('recipeId') recipeId: string, 
    // @Param('ingredientId') ingredientId: string) {
    //     const ingredient = await this.ingredientService.findOne(ingredientId);
    //     if (!ingredient) {
    //         throw new HttpException('Ingredient Not Found', HttpStatus.NOT_FOUND);
    //     }

    //     return this.recipeService.addIngredient(recipeId, ingredientId);

    // }

    // @Post(':recipeId/ingredient/:ingredientName/quantity/:quantity')
    // async addIngredientQuantity(
    //     @Param('recipeId') recipeId: string,
    //     @Param('ingredientName') ingredientName: string,
    //     @Param('quantity') quantity: string
    // ) {
    //     const ingredient = await this.ingredientService.findOneByName(ingredientName);

    //     if (!ingredient) {
    //         throw new HttpException('Ingredient Not Found', HttpStatus.NOT_FOUND);
    //     }

    //     const id =  ingredient._id.toString();
    //     const q =  parseInt(quantity);
    //     return this.recipeService.addIngredientQuantity(recipeId, id, q);
    // }

    // @Post(':recipeId/ingredient/:ingredientName/quantity/:quantity')
    // async addIngredientQuantity(
    //     @Param('recipeId') recipeId: string,
    //     @Param('ingredientName') ingredientName: string,
    //     @Param('quantity') quantity: string
    // ) {
    //     const ingredient = await this.ingredientService.findOneByName(ingredientName);

    //     if (!ingredient) {
    //         throw new HttpException('Ingredient Not Found', HttpStatus.NOT_FOUND);
    //     }

    //     const id =  ingredient._id.toString();
    //     const q =  parseInt(quantity);
    //     return this.recipeService.addIngredientQuantity(recipeId, id, q);
    // }

}
