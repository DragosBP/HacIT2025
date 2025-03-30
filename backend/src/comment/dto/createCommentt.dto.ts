import { IsNotEmpty, IsString, IsNumber, IsOptional, IsArray } from "class-validator";
import { Transform, TransformFnParams } from 'class-transformer';
import { Type } from "class-transformer";
import { User } from "src/user/schemas/user.schema";
import { Review } from "src/review/schemas/review.schema";

export class CreateCommentDto {
    @IsNotEmpty()
    @Type(() => User)
    userId: User;

    @IsNotEmpty()
    @Type(() => Review)
    reviewId: Review;

    @IsString()
    @Transform(({ value }: TransformFnParams) => value.trim())
    @IsNotEmpty()
    text: string;
}
