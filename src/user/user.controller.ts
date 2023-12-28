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
import { UserEntity } from './entity';
import { CreateUserDto } from './dtos';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UsePipes(ValidationPipe)
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.userService.createUser(createUserDto);
  }

  @Get(':id')
  async findUserById(@Param('id') id: string): Promise<UserEntity[]> {
    return await this.userService.findUserById(id);
  }

  @Get()
  async findUsers(): Promise<UserEntity[]> {
    return await this.userService.findUsers();
  }
}
