import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginRequestDto {
    @IsNotEmpty()
    @IsString()
    identifier: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    password: string;
}
