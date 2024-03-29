import { Controller } from "@nestjs/common";
import { IngredientService } from "./ingredient.service";
import { IngredientDTO } from "./dto/ingredient.dto";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { IngredientMSG } from "src/common/constants";

@Controller()
export class IngredientController {

    constructor(private readonly ingredientService: IngredientService) {}

    @MessagePattern(IngredientMSG.CREATE)
    create(@Payload() ingredientDTO: IngredientDTO) {
        return this.ingredientService.create(ingredientDTO);
    }


    @MessagePattern(IngredientMSG.FIND_ALL)
    findAll() {
        return this.ingredientService.findAll();
    }

    @MessagePattern(IngredientMSG.DELETE_SHOPPING)
    deleteShoppingIngredients() {
        return this.ingredientService.deleteAllShopping();
    }

    @MessagePattern(IngredientMSG.GET_SHOPPING_INGREDIENTS)
    getShoppingIngredients() {
        return this.ingredientService.findAllShopping();
    }

    @MessagePattern(IngredientMSG.FIND_ONE)
    findOne(@Payload() id: string) {
        return this.ingredientService.findOne(id);
    }

    @MessagePattern(IngredientMSG.FIND_ONE_BY_NAME)
    findOneByName(@Payload() name: string) {
        return this.ingredientService.findOneByName(name);
    }

    @MessagePattern(IngredientMSG.UPDATE)
    update(@Payload() payload: any) {
        return this.ingredientService.update(payload.id, payload.ingredientDTO);
    }

    @MessagePattern(IngredientMSG.DELETE)
    delete(@Payload() id: string) {
        return this.ingredientService.delete(id);
    }

    @MessagePattern(IngredientMSG.GET_INGREDIENTS)
    getIngredients(@Payload() payload) {
        return this.ingredientService.getIngredients(payload);
    }
    

}
