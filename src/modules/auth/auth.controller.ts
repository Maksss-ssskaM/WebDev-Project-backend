import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDTO } from '../users/dto';
import { UserLoginDTO } from './dto';
import { AuthUserResponse } from './responce';
import { ApiResponse, ApiTags, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt-guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @ApiTags('API')
  @ApiOperation({ summary: 'Register user' })
  @ApiResponse({ status: 201, type: AuthUserResponse })
  @ApiResponse({
    status: 400,
    description: 'Email and password must match regular expressions',
  })
  @Post('register')
  register(@Body() dto: CreateUserDTO): Promise<AuthUserResponse> {
    return this.authService.registerUsers(dto);
  }
  @ApiTags('API')
  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({ status: 200, type: AuthUserResponse })
  @ApiResponse({
    status: 400,
    description: 'Email and password must match regular expressions',
  })
  @Post('login')
  login(@Body() dto: UserLoginDTO): Promise<AuthUserResponse> {
    return this.authService.loginUser(dto);
  }
}
