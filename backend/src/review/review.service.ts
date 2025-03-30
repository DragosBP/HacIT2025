import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";  // Import Types for ObjectId
import { Review } from "src/review/schemas/review.schema";
import { Cartier } from "src/cartier/schemas/cartier.schema";
import { CreateReviewDto } from "./dto/createReview.dto";
import { EditReviewDto } from "./dto/editReview.dto";

@Injectable()
export class ReviewService {
    constructor(
        @InjectModel(Review.name) private reviewModel: Model<Review>,
        @InjectModel(Cartier.name) private cartierModel: Model<Cartier>,
    ) {}

    async createReview(createReviewDto: CreateReviewDto): Promise<Review> {
        // Create and save the review
        const createdReview = new this.reviewModel(createReviewDto);
        const savedReview = await createdReview.save();

        // Find the corresponding Cartier
        const cartier = await this.cartierModel.findById(createReviewDto.cartierId);
        if (!cartier) {
            throw new NotFoundException(`Cartier with ID ${createReviewDto.cartierId} not found`);
        }

        // Ensure we are pushing an ObjectId, not the full Review object
        cartier.reviews.push(savedReview);
        await cartier.save();

        return savedReview;
    }


    async editReview(editReviewDto: EditReviewDto): Promise<Review> {
        const { reviewId, text, grade } = editReviewDto;

        // Ensure reviewId is a valid ObjectId
        if (!Types.ObjectId.isValid(reviewId as any)) {
            throw new NotFoundException(`Invalid review ID: ${reviewId}`);
        }

        // Find and update the review
        const updatedReview = await this.reviewModel.findByIdAndUpdate(
            reviewId,
            { text, grade },
            { new: true, runValidators: true } // Return updated document and apply validation
        );

        if (!updatedReview) {
            throw new NotFoundException(`Review with ID ${reviewId} not found`);
        }

        return updatedReview;
    }
}
