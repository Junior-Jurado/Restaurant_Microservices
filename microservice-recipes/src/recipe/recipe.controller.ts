import { RecipeService } from "./recipe.service";
import { RecipeDTO } from "./dto/recipe.dto";
import { Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { RecipeMSG } from "src/common/constants";


@Controller()
export class RecipeController {


    constructor(private readonly recipeService: RecipeService) {}

    @MessagePattern(RecipeMSG.CREATE)
    create(@Payload() recipeDTO: RecipeDTO) {
        return this.recipeService.create(recipeDTO);
    }
    
    @MessagePattern(RecipeMSG.FIND_ALL)
    findAll() {
        return this.recipeService.findAll();
    }

    @MessagePattern(RecipeMSG.FIND_ONE)
    findOne(@Payload() id: string) {
        return this.recipeService.findOne(id);
    }

    @MessagePattern(RecipeMSG.UPDATE)
    update(@Payload() payload) {
        return this.recipeService.update(payload.id, payload.recipeDTO);
    }


    @MessagePattern(RecipeMSG.DELETE)
    delete(@Payload() id:string) {
        return this.recipeService.delete(id);
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

    @MessagePattern(RecipeMSG.ADD_INGREDIENT)
    async addIngredientQuantity(@Payload() payload) {
        console.log(payload.recipeId)
        console.log(payload.ingredientId)
        console.log(payload.quan)
        return this.recipeService.addIngredientQuantity(payload.recipeId, payload.ingredientId, payload.quan);
    }

    

}
