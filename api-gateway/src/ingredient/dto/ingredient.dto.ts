import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, isString } from "class-validator";

export class IngredientDTO {
    @ApiProperty()
    _id?: any;
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly name: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    readonly quantity: number;
    @ApiProperty()
    @IsString()
    readonly image?: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly description: string;
    
}