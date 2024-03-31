import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEmpty, IsNotEmpty, IsNumber } from "class-validator";
import { RecipeDTO } from "src/recipe/dto/recipe.dto";


export class OrderDTO {

    @IsEmpty()
    readonly recipe: RecipeDTO;

    @ApiProperty()
    readonly state?: string;

    @ApiProperty()
    readonly tableNumber: number;

    constructor(data: Partial<OrderDTO>) {
        Object.assign(this, data);
        if (this.state === undefined) {
            this.state = 'Created';
        }
    }
}