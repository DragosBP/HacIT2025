import { IsNotEmpty, IsNumber, IsString, Max, Min } from "class-validator";
import { Transform, TransformFnParams } from 'class-transformer';
import { Type } from "class-transformer";
import { User } from "src/user/schemas/user.schema";
import { Cartier } from "src/cartier/schemas/cartier.schema";

export class CreateReviewDto {
    @IsNotEmpty()
    @Type(() => User)
    userId: User;

    @IsNotEmpty()
    @Type(() => Cartier)
    cartierId: Cartier;

    @IsString()
    @Transform(({ value }: TransformFnParams) => value.trim())
    @IsNotEmpty()
    title: string;

    @IsString()
    @Transform(({ value }: TransformFnParams) => value.trim())
    @IsNotEmpty()
    text: string;

    @IsNumber()
    @IsNotEmpty()
    @Min(1)
    @Max(5)
    grade: number;
}
