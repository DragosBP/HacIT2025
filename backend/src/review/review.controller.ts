import { Controller, Post, Body, Get, Param, NotFoundException } from "@nestjs/common";
import { ReviewService } from "./review.service";
import { CreateReviewDto } from "./dto/createReview.dto"; // DTO for creating a review
import { Review } from "src/review/schemas/review.schema";
import { EditReviewDto } from "./dto/editReview.dto";

@Controller('review')
export class ReviewController {
    constructor(private readonly reviewService: ReviewService) {}

    @Get(':id')
        async getOneReview(@Param('id') id: string): Promise<Review> {
            const cartier = await this.reviewService.getOneReview(id);
            if (!cartier) {
                throw new NotFoundException('Review not found');
            }
            return cartier;
        }

    @Post()
    async createReview(@Body() createReviewDto: CreateReviewDto): Promise<Review> {
        return this.reviewService.createReview(createReviewDto);
    }

    @Post('/edit')
    async editReview(@Body() editReviewDto: EditReviewDto): Promise<Review> {
        return this.reviewService.editReview(editReviewDto);
    }
}
