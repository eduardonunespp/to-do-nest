import { Injectable, NotFoundException } from '@nestjs/common';
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

  async findUsers(): Promise<UserEntity[]> {
    const users = await this.userRepository.find();

    if (!users || users.length === 0) {
      throw new NotFoundException(`Users Not Found`);
    }

    return users;
  }

  async findUserById(userId: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: {
        id: Number(userId)
      },
      relations: {
        assigmentList: {
          assignments: true
        }
      }
    });

    if (!user) {
      throw new NotFoundException(`User not found for userId ${userId}`);
    }

    return user;
  }

  async findUserByEmail(email: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: {
        email: email
      },
      relations: {
        assigmentList: {
          assignments: true
        }
      }
    });

    if (!user) {
      throw new NotFoundException(`User not found with email ${email}`);
    }

    return user;
  }
}
