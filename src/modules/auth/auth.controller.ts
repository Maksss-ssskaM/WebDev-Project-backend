import {Body, Controller, Post, UseGuards} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {CreateUserDTO} from "../users/dto";
import {UserLoginDTO} from "./dto";
import {AuthUserResponse} from "./responce";
import {ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt-guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    @ApiTags('API')
    @ApiResponse({status: 201, type: AuthUserResponse})
    @Post('register')
    register(@Body() dto: CreateUserDTO): Promise<AuthUserResponse>{
        return this.authService.registerUsers(dto)
    }
    @ApiTags('API')
    @ApiResponse({status: 200, type: AuthUserResponse})
    @Post('login')
    login(@Body() dto: UserLoginDTO): Promise<AuthUserResponse>{
        return this.authService.loginUser(dto)
    }

    @UseGuards(JwtAuthGuard)
    @Post('test')
    test() {
        return true
    }
}
