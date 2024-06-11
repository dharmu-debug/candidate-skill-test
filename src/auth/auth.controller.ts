import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/register-dto';
import { LoginReqDto } from './dto/login-dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('register')
    async register(@Body() body: CreateUserDto,): Promise<string> {
        return this.authService.register(body.email, body.name, body.password, body.role);
    }

    @Post('login')
    async login(@Body() body: LoginReqDto): Promise<string> {
        return this.authService.login(body.email, body.password);
    }
}
