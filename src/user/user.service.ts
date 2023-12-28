import { Injectable } from '@nestjs/common';
import { UserEntity } from './entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const saltOrRounds = 10;

    const passwordHashed = await hash(createUserDto.password, saltOrRounds);
    const confirmPasswordHashed = await hash(
      createUserDto.confirmPassword,
      saltOrRounds
    );

    return this.userRepository.save({
      ...createUserDto,
      password: passwordHashed,
      confirmPassword: confirmPasswordHashed
    });
  }
}
