import { IsNotEmpty, IsNumber, IsString, Max, Min } from "class-validator";
import { Transform, TransformFnParams } from 'class-transformer';
import { Type } from "class-transformer";
import { Review } from "../schemas/review.schema";

export class EditReviewDto {
    @IsNotEmpty()
    @Type(() => Review)
    reviewId: Review;

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
