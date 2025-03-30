import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document, Schema as MongooseSchema } from "mongoose";
import { Review } from "src/review/schemas/review.schema";
import { User } from "src/user/schemas/user.schema";

@Schema( { timestamps: true } )
export class Comment extends Document {
    @Prop({ required: true, type: MongooseSchema.Types.ObjectId, ref: 'User' })
    userId: User;

    @Prop({ required: true, type: MongooseSchema.Types.ObjectId, ref: 'Review' })
    reviewId: Review;

    @Prop({ required: true })
    text: string;
}

export const CommentSchema = SchemaFactory.createForClass(Comment)