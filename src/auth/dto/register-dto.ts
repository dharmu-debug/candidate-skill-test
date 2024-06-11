import { IsString, IsEmail, IsEnum, IsNotEmpty } from 'class-validator';
import { UserRoleType } from '../../user/user.entity';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsEnum(UserRoleType)
    @IsNotEmpty()
    role: UserRoleType;
}