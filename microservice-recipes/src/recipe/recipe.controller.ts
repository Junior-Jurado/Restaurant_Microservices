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
    

    @MessagePattern(RecipeMSG.ADD_INGREDIENT)
    async addIngredientQuantity(@Payload() payload) {
        return this.recipeService.addIngredientQuantity(payload.recipeId, payload.ingredientId, payload.quan);
    }

    @MessagePattern(RecipeMSG.FIND_ONE_RANDOM)
    findOneRandom() {
        return this.recipeService.findOneRandom();
    }

    // @MessagePattern(RecipeMSG.COOK)
    // cook(@Payload() payload) {
    //     return this.recipeService.cook(payload);
    // }


    

}
