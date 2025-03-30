import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Role } from '../../common/enums/role.enum';
import { Review } from 'src/review/schemas/review.schema';


@Schema( { timestamps: true } )
export class User extends Document {
    @Prop({ required: true })
    firstName: string;

    @Prop({ required: true })
    lastName: string;

    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({ default: [], type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Review' }] })
    reviews: Review[]

    @Prop({ required: true, type: String, enum: Role, default: Role.User })
    role: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);
