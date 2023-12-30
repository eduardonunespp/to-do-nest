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
import { CreateUserDto, ReturnUserDto } from './dtos';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UsePipes(ValidationPipe)
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.userService.createUser(createUserDto);
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
