import {
  Post,
  Body,
  Controller,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { LoginDto, ReturnLoginDto } from './dtos';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UsePipes(ValidationPipe)
  @Post()
  async login(@Body() loginUser: LoginDto): Promise<ReturnLoginDto> {
    return await this.authService.login(loginUser);
  }
}
