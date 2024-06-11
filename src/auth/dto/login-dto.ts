import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class LoginReqDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}