import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEmpty } from "class-validator";
import { RecipeDTO } from "src/recipe/dto/recipe.dto";


export class OrderDTO {
    @ApiProperty()
    @IsBoolean()
    readonly isDone?: boolean;
    @IsEmpty()
    @ApiProperty()
    readonly recipe: RecipeDTO;

    constructor(data: Partial<OrderDTO>) {
        Object.assign(this, data);
        if (this.isDone === undefined) {
            this.isDone = false;
        }
    }
}