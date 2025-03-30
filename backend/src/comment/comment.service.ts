import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Schema as MongooseSchema } from "mongoose";
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
        const reviewId = createCommentDto.reviewId;

        const review = await this.reviewModel.findById(reviewId);
        if (!review) {
            throw new NotFoundException(`Review with ID ${reviewId} not found`);
        }

        const createdComment = new this.commentModel(createCommentDto);
        const savedComment = await createdComment.save();

        review.comments.push(savedComment._id as MongooseSchema.Types.ObjectId);
        await review.save();

        return savedComment as Comment; // Use type assertion if necessary
    }

    async editComment(editCommentDto: EditCommentDto): Promise<Comment> {
        const { commentId, text } = editCommentDto;

        const updatedComment = await this.commentModel.findByIdAndUpdate(
            commentId,
            { text },
            { new: true, runValidators: true }
        );

        if (!updatedComment) {
            throw new NotFoundException(`Comment with ID ${commentId} not found`);
        }

        return updatedComment as Comment; // Use type assertion if necessary
    }

    async deleteComment(commentId: string): Promise<boolean> {
        await this.commentModel.deleteOne({ _id: commentId });
        return true;
    }
}
