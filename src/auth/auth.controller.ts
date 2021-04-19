import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResponse } from './authResponse.interface';
import { RegisterDto } from './dto/register.dto';
@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/register')
  async register(
    @Body(ValidationPipe) registerDto: RegisterDto,
  ): Promise<AuthResponse> {
    return await this.authService.register(registerDto);
  }
  @Post('/login')
  async login(
    @Body(ValidationPipe) loginDto: RegisterDto,
  ): Promise<AuthResponse> {
    return await this.authService.login(loginDto);
  }
  @Post('/loggedin')
  async loggedIn(@Body('token') token: string) {
    return await this.authService.loggedIn(token);
  }
}
