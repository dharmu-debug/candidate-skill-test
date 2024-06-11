import { Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { CreateUserDto } from './dto/register-dto';
import { UserRoleType } from '../user/user.entity';

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService,
        private userService: UserService) { }

    async register(email: string, name: string, password: string, role: UserRoleType): Promise<string> {
        try {
            const user = await this.userService.findOne(email);
            if (user) {
                throw new Error('User already exist');
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const userData: CreateUserDto = {
                email: email,
                name: name,
                password: hashedPassword,
                role: role,
            }
            await this.userService.create(userData);
            return 'User registered successfully';
        } catch (error) {
            throw new InternalServerErrorException('Failed to register user', error.message);

        }

    }

    async login(email: string, password: string): Promise<string> {
        try {
            const user = await this.userService.findOne(email);
            if (!user) {
                throw new NotFoundException('User not found');
            }

            console.log('Stored hashed password:', user.password);
            console.log('Provided password:', password);

            const isPasswordValid = await bcrypt.compare(password, user.password);
            console.log('Is password valid:', isPasswordValid);
            if (!isPasswordValid) {
                throw new UnauthorizedException('Invalid credentials');
            }

            const token = this.jwtService.sign({ email: user.email });
            return token;
        } catch (error) {
            console.error('Error occurred during login:', error);
            throw new InternalServerErrorException('Failed to login user', error.message);
        }

    }
}
