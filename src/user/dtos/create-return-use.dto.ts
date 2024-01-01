import { UserEntity } from '../entity';

export class CreateReturnUserDto {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  id: number;
  createAt: Date;
  updateAt: Date;

  constructor(userEntity: UserEntity) {
    this.name = userEntity.name;
    this.email = userEntity.email;
    this.password = userEntity.password;
    this.confirmPassword = userEntity.confirmPassword;
    this.id = userEntity.id;
    this.createAt = userEntity.createAt;
    this.updateAt = userEntity.updatedAt;
  }
}
