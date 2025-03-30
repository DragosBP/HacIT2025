import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ReviewService } from "./review.service";
import { ReviewController } from "./review.controller";
import { Review, ReviewSchema } from "src/review/schemas/review.schema"; 
import { CartierModule } from "src/cartier/cartier.module";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Review.name, schema: ReviewSchema }]),
        CartierModule
    ],
    providers: [ReviewService],
    controllers: [ReviewController],
    exports: [ReviewService]
})
export class ReviewModule {}
