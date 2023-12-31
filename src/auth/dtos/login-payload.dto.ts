import { UserEntity } from 'src/user/entity';

export class loginPayloadDto {
  id: number;

  constructor(user: UserEntity) {
    this.id = user.id;
  }
}
