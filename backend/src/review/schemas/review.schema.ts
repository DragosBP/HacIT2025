import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema } from "mongoose";
import { User } from "src/user/schemas/user.schema";
import { Cartier } from "src/cartier/schemas/cartier.schema";
import { Comment } from "src/comment/schemas/comment.schema";

@Schema({ timestamps: true })
export class Review extends Document {
    @Prop({ required: true, type: MongooseSchema.Types.ObjectId, ref: 'User' })
    userId: User;

    @Prop({ required: true, type: MongooseSchema.Types.ObjectId, ref: 'Cartier' })
    cartierId: Cartier;

    @Prop({ default: [], type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Comment' }] })
    comments: MongooseSchema.Types.ObjectId[]; // Store ObjectId references to comments

    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    text: string;

    @Prop({ default: 0 })
    grade: number;

    @Prop({ default: 0 })
    nrLikes: number;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
