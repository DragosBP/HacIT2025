import { IsNotEmpty, IsString, IsNumber, IsOptional, IsArray } from "class-validator";
import { Type } from "class-transformer";
import { User } from "src/user/schemas/user.schema";
import { Cartier } from "src/cartier/schemas/cartier.schema";

export class ReviewDto {
    @IsNotEmpty()
    @Type(() => User)
    userId: User;

    @IsNotEmpty()
    @Type(() => Cartier)
    cartierId: Cartier;

    @IsArray()
    @IsOptional()
    comments?: string[];

    @IsString()
    @IsNotEmpty()
    text: string;

    @IsNumber()
    @IsOptional()
    grade?: number;

    @IsNumber()
    @IsOptional()
    nrLikes?: number;
}
