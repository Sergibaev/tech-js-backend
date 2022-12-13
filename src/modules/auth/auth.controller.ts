import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../guards/jwt-guard';
import { CreateUserDTO } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LoginUserDTO } from './dto/login-user.dto';
import { AuthUserResponse } from './response/auth-user.response';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @ApiTags('Auth')
    @ApiResponse({status: 201, type: CreateUserDTO})
    @Post('register')
    register(@Body() dto: CreateUserDTO): Promise<CreateUserDTO> {
        return this.authService.register(dto);
    }

    @ApiTags('Auth')
    @ApiResponse({status: 200, type: AuthUserResponse})
    @Post('login')
    login(@Body() dto: LoginUserDTO): Promise<AuthUserResponse> {
        return this.authService.login(dto)
    }
}
