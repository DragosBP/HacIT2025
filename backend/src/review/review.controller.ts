import { Controller, Post, Body } from "@nestjs/common";
import { ReviewService } from "./review.service";
import { CreateReviewDto } from "./dto/createReview.dto"; // DTO for creating a review
import { Review } from "src/review/schemas/review.schema";

@Controller('review')
export class ReviewController {
    constructor(private readonly reviewService: ReviewService) {}

    @Post()
    async createReview(@Body() createReviewDto: CreateReviewDto): Promise<Review> {
        return this.reviewService.createReview(createReviewDto);
    }
}
