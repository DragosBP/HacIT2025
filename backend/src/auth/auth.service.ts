import {
    BadRequestException,
    HttpException,
    HttpStatus,
    Injectable,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../user/schemas/user.schema';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dtos/register.dto';
import { LoginDto } from './dtos/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<User>,
        private readonly jwtService: JwtService,
    ) {}

    async register(registerDto: RegisterDto): Promise<boolean> {
        const userEmail = await this.userModel.findOne({ email: registerDto.email }).exec();

        if (userEmail) {
            throw new BadRequestException('Email already exists');
        }

        const hashedPassword = await bcrypt.hash(registerDto.password, 10);

        try {
            const user = await this.userModel.create({
                ...registerDto,
                password: hashedPassword,
            });

            await user.save();
        } catch (error) {
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        
        return true;
    }

    async login(loginDto: LoginDto): Promise<string> {
        const user = await this.userModel.findOne({ email: loginDto.email }).exec();

        if (!user) {
            throw new BadRequestException('Invalid email');
        }

        const isPasswordValid = await bcrypt.compareSync(loginDto.password, user.password);

        if (!isPasswordValid) {
            throw new BadRequestException('Invalid password');
        }

        return this.jwtService.signAsync(
            {
                id: user._id,
                email: user.email,
                role: user.role,
            },
            {
                secret: process.env.JWT_SECRET,
                expiresIn: '4d',
            },
        );
    }
}
