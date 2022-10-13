import { IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @MinLength(3)
  username: string;

  @IsNotEmpty()
  password: string;
}
