import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  getUser(user: any): Promise<any> {
    return user;
  }
}
