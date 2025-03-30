import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CartierModule } from './cartier/cartier.module';
import { ReviewModule } from './review/review.module';
import { CommentModule } from './comment/comment.module';

const envModule = ConfigModule.forRoot({
  isGlobal: true,
});

@Module({
  imports: [
    envModule,
    AuthModule,
    CartierModule,
    ReviewModule,
    CommentModule,
    MongooseModule.forRoot(process.env.DATABASE_URL || '')
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
