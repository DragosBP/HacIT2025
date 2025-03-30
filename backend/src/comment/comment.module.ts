import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { Comment, CommentSchema } from './schemas/comment.schema';
import { Review, ReviewSchema } from '../review/schemas/review.schema';
import { ReviewModule } from 'src/review/review.module';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Comment.name, schema: CommentSchema },
        ]),
        ReviewModule
    ],
    controllers: [CommentController],
    providers: [CommentService],
    exports: [CommentService]
})
export class CommentModule {}
