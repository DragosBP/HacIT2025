import { IsNotEmpty, IsNumber, IsString, Max, Min } from "class-validator";
import { Type } from "class-transformer";
import { Review } from "../schemas/review.schema";

export class EditReviewDto {
    @IsNotEmpty()
    @Type(() => Review)
    reviewId: Review;

    @IsString()
    @IsNotEmpty()
    text: string;

    @IsNumber()
    @IsNotEmpty()
    @Min(1)
    @Max(5)
    grade: number;
}
