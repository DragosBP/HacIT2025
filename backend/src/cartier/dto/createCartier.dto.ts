import { IsNotEmpty, IsString, IsOptional, IsNumber, IsArray } from "class-validator";
import { Type } from "class-transformer";
import { Review } from "src/review/schemas/review.schema";


export class CreateCartierDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    city: string;

    @IsString()
    @IsOptional()
    judet?: string;

    @IsString()
    @IsOptional()
    sector?: string;

    @IsString()
    @IsNotEmpty()
    loc: string;

}
