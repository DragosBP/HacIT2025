import { IsNotEmpty, IsString, IsNumber, IsOptional, IsArray } from "class-validator";
import { Transform, TransformFnParams } from 'class-transformer';
import { Type } from "class-transformer";
import { Review } from "src/review/schemas/review.schema";

export class EditCommentDto {
    @IsNotEmpty()
    @Type(() => Review)
    commentId: Review;

    @IsString()
    @Transform(({ value }: TransformFnParams) => value.trim())
    @IsNotEmpty()
    text: string;
}
