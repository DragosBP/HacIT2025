import { Transform, TransformFnParams } from 'class-transformer';
import {
    IsEmail,
    IsNotEmpty,
    IsString,
} from 'class-validator';

export class LoginDto {
    @IsEmail()
    @Transform(({ value }: TransformFnParams) => value.trim())
    @Transform(({ value }: TransformFnParams) => value.toLowerCase())
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}