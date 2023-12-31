import {
  Post,
  Body,
  Controller,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { LoginDto } from './dtos';
import { AuthService } from './auth.service';
import { ReturnUserDto } from 'src/user/dtos';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UsePipes(ValidationPipe)
  @Post()
  async login(@Body() loginUser: LoginDto): Promise<ReturnUserDto> {
    return new ReturnUserDto(await this.authService.login(loginUser));
  }
}
