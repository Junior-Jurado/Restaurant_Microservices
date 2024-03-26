import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEmpty, IsNotEmpty } from "class-validator";
import { RecipeDTO } from "src/recipe/dto/recipe.dto";


export class OrderDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsBoolean()
    readonly isDone: boolean;
    @IsEmpty()
    @ApiProperty()
    readonly recipe: RecipeDTO;
}