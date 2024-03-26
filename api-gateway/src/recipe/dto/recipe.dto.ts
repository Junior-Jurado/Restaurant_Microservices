import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { IngredientDTO } from "src/ingredient/dto/ingredient.dto";


export class RecipeDTO {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly name: string;
    readonly ingredients: IngredientDTO[];
    readonly _id?: string;
}
