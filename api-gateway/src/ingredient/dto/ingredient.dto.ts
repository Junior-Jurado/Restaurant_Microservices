import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, isString } from "class-validator";

export class IngredientDTO {
    _id?: any;
    readonly name: string;
    readonly quantity: number;
    readonly image?: string;
    readonly description: string;
    
}