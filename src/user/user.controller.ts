import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateReturnUserDto, CreateUserDto, ReturnUserDto } from './dtos';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UsePipes(ValidationPipe)
  @Post('/register')
  @ApiOperation({ summary: 'Register account' })
  async createUser(
    @Body() createUserDto: CreateUserDto
  ): Promise<CreateReturnUserDto> {
    return new CreateReturnUserDto(
      await this.userService.createUser(createUserDto)
    );
  }

  @Get()
  async findUsers(): Promise<ReturnUserDto[]> {
    return (await this.userService.findUsers()).map(
      (user) => new ReturnUserDto(user)
    );
  }

  @Get(':id')
  async findUserById(@Param('id') id: string): Promise<ReturnUserDto> {
    return new ReturnUserDto(await this.userService.findUserById(id));
  }
}
