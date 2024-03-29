import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { IngredientDTO } from "src/ingredient/dto/ingredient.dto";


export class RecipeDTO {
    readonly _id?: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly name: string;
    readonly ingredients: IngredientDTO[];
    readonly description: string;
    readonly image?: string;
}
