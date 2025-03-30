import { IsNotEmpty, IsString, IsNumber, IsOptional, IsArray } from "class-validator";
import { Type } from "class-transformer";
import { User } from "src/user/schemas/user.schema";
import { Review } from "src/review/schemas/review.schema";

export class EditCommentDto {
    @IsNotEmpty()
    @Type(() => Review)
    commentId: Review;

    @IsString()
    @IsNotEmpty()
    text: string;
}
