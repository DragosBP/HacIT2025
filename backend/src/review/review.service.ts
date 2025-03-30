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

    async getOneReview(id: string): Promise<Review> {
        return this.reviewModel
        .findById(id)
        .populate({
            path: 'comments',
            populate: {
                path: 'userId',
                model: 'User',
                select: 'firstName lastName', // Select only firstName and lastName
            },
        })
        .exec();   
    }

    async createReview(createReviewDto: CreateReviewDto): Promise<Review> {
        // Find the corresponding Cartier
        const cartier = await this.cartierModel.findById(createReviewDto.cartierId);
        if (!cartier) {
            throw new NotFoundException(`Cartier with ID ${createReviewDto.cartierId} not found`);
        }
        
        // Create and save the review
        const createdReview = new this.reviewModel(createReviewDto);
        const savedReview = await createdReview.save();

        cartier.reviews.push(savedReview);
        await cartier.save();

        return savedReview;
    }

    async editReview(editReviewDto: EditReviewDto): Promise<Review> {
        const { reviewId, text, grade } = editReviewDto;

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
