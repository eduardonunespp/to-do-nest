import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async testFunc(@Body() data: any): Promise<any> {
    return this.userService.getUser(data);
  }
}
