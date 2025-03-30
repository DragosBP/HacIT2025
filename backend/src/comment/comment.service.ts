import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Comment } from "src/comment/schemas/comment.schema";
import { Review } from "src/review/schemas/review.schema";
import { CreateCommentDto } from "./dto/createCommentt.dto";
import { EditCommentDto } from "./dto/editComment.dto";

@Injectable()
export class CommentService {
    constructor(
        @InjectModel(Comment.name) private commentModel: Model<Comment>,
        @InjectModel(Review.name) private reviewModel: Model<Review>,
    ) {}

    async createComment(createCommentDto: CreateCommentDto): Promise<Comment> {
        const reviewId = createCommentDto.reviewId

        const review = await this.reviewModel.findById(reviewId);
        if (!review) {
            throw new NotFoundException(`Review with ID ${reviewId} not found`);
        }

        const createdComment = new this.commentModel(createCommentDto);
        const savedComment = await createdComment.save();
        
        await review.save();

        return savedComment;
    }

    async editComment(editReviewDto: EditCommentDto): Promise<Comment> {
            const { commentId, text,  } = editReviewDto;
    
            // Find and update the review
            const updatetComment = await this.commentModel.findByIdAndUpdate(
                commentId,
                { text },
                { new: true, runValidators: true } // Return updated document and apply validation
            );
    
            if (!updatetComment) {
                throw new NotFoundException(`Review with ID ${commentId} not found`);
            }
    
            return updatetComment;
        }

    async deleteComment(commentId): Promise<boolean> {
        await this.commentModel.deleteOne({
            _id: commentId
        })

        return true;
    }
}
