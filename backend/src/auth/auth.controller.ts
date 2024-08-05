import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  HttpException,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { AuthDto } from '../dto/auth.dto';
import { AuthService } from './auth.service';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register')
  async register(@Body() body: AuthDto) {
    const user = await this.authService.findUser(body.username);
    console.log(user);
    if (user) {
      throw new HttpException('User already exists', 400);
    }

    return this.authService.register(body);
  }
  @Post('login')
  async login(@Body() body: AuthDto) {
    const user = await this.authService.login(body);

    return user;
  }
  @Post('validate')
  async validate(@Body() body: { token: string }) {
    const user = await this.authService.validate(body.token);

    return user;
  }
}
