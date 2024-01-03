import {
  Post,
  Body,
  Controller,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { LoginDto, ReturnLoginDto } from './dtos';
import { AuthService } from './auth.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UsePipes(ValidationPipe)
  @Post()
  @ApiOperation({ summary: 'Login a user' })
  async login(@Body() loginUser: LoginDto): Promise<ReturnLoginDto> {
    return await this.authService.login(loginUser);
  }
}
