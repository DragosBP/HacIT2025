import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Review } from "src/review/schemas/review.schema";

@Schema( { timestamps: true } )
export class Cartier extends Document {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    city: string;

    @Prop()
    judet: string;

    @Prop()
    sector: string;

    @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Review' }] })
    reviews: Review[]

    @Prop({ required: true })
    loc: string;

    @Prop({ default: 0 })
    meanGrade: number;
}

export const CartierSchema = SchemaFactory.createForClass(Cartier)