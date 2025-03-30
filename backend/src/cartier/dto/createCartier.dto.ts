import { IsNotEmpty, IsString, IsOptional } from "class-validator";
import { Transform, TransformFnParams } from 'class-transformer';


export class CreateCartierDto {
    @IsString()
    @Transform(({ value }: TransformFnParams) => value.trim())
    @IsNotEmpty()
    name: string;

    @IsString()
    @Transform(({ value }: TransformFnParams) => value.trim())
    @IsNotEmpty()
    city: string;

    @IsString()
    @Transform(({ value }: TransformFnParams) => value.trim())
    @IsOptional()
    judet?: string;

    @IsString()
    @Transform(({ value }: TransformFnParams) => value.trim())
    @IsOptional()
    sector?: string;

    @IsString()
    @Transform(({ value }: TransformFnParams) => value.trim())
    @IsNotEmpty()
    loc: string;

}
