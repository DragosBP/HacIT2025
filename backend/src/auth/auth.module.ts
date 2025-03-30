import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User, UserSchema } from '../user/schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from 'src/common/strategies/jwt.strategy';

@Module({
    imports: [
        JwtModule.register({
            global: true,
        }),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
    exports: [AuthService]
})

export class AuthModule {}