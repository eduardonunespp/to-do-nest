import { Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from 'src/user/entity';
import { LoginDto } from './dtos';
import { UserService } from 'src/user/user.service';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async login(loginUser: LoginDto): Promise<UserEntity> {
    const user: UserEntity | undefined = await this.userService
      .findUserByEmail(loginUser.email)
      .catch(() => undefined);

    const isMatch = await compare(loginUser.password, user?.password || '');

    if (!user || !isMatch) {
      throw new NotFoundException('Email or password invalid');
    }

    return user;
  }
}
