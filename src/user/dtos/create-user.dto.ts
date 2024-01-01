import {
  IsNotEmpty,
  IsString,
  IsEmail,
  Matches,
  Validate,
  MaxLength,
  ValidationArguments
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255, { message: 'O nome deve ter no máximo 255 caracteres.' })
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @MaxLength(255, { message: 'O email deve ter no máximo 255 caracteres.' })
  email: string;

  @IsNotEmpty()
  @Matches(/^.{8,}$/, {
    message: 'A senha deve ter no mínimo 8 caracteres.'
  })
  @MaxLength(255, { message: 'A senha deve ter no máximo 255 caracteres.' })
  password: string;

  @IsNotEmpty()
  @IsString()
  @Validate(
    (value, args: ValidationArguments) => {
      const confirmPassword = value;
      const password = (args.object as CreateUserDto).password;
      return (
        password === confirmPassword &&
        value.length >= 8 &&
        password.length >= 8
      );
    },
    {
      message: 'As senhas não coincidem ou têm menos de 8 caracteres.'
    }
  )
  @MaxLength(255, {
    message: 'A confirmação de senha deve ter no máximo 255 caracteres.'
  })
  confirmPassword: string;
}
