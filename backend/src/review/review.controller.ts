import { Controller, Post, Body, Get, Param, NotFoundException, UseGuards } from "@nestjs/common";
import { ReviewService } from "./review.service";
import { CreateReviewDto } from "./dto/createReview.dto"; // DTO for creating a review
import { Review } from "src/review/schemas/review.schema";
import { EditReviewDto } from "./dto/editReview.dto";
import { JwtAuthGuard } from "src/common/guards/auth.guard";
import { RolesGuard } from "src/common/guards/role.guard";
import { Role } from "src/common/enums/role.enum";
import { Roles } from "src/common/decorators/role.decorator";

@Controller('reviews')
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

    // @UseGuards(JwtAuthGuard)
    // @UseGuards(RolesGuard)
    // @Roles(Role.Admin, Role.User)
    @Post()
    async createReview(@Body() createReviewDto: CreateReviewDto): Promise<Review> {
        return this.reviewService.createReview(createReviewDto);
    }

    // @UseGuards(JwtAuthGuard)
    // @UseGuards(RolesGuard)
    // @Roles(Role.Admin, Role.User)
    @Post('/edit')
    async editReview(@Body() editReviewDto: EditReviewDto): Promise<Review> {
        return this.reviewService.editReview(editReviewDto);
    }
}
