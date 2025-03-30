import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';

const envModule = ConfigModule.forRoot({
  isGlobal: true,
});

@Module({
  imports: [
    envModule,
    AuthModule,
    MongooseModule.forRoot(process.env.DATABASE_URL || '')
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
