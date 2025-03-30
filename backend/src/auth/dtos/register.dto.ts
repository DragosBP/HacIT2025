import { Transform, TransformFnParams } from 'class-transformer';
import {
    IsEmail,
    IsNotEmpty,
    IsString,
    MaxLength,
    MinLength,
} from 'class-validator';

export class RegisterDto {
    @IsString()
    @IsNotEmpty()
    firstName: string;

    @IsString()
    @IsNotEmpty()
    lastName: string;

    @IsEmail()
    @Transform(({ value }: TransformFnParams) => value.trim())
    @Transform(({ value }: TransformFnParams) => value.toLowerCase())
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(255)
    password: string;

}