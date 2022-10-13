import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as argon2 from 'argon2';
import { CreateUserInput } from './auth.controller';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(username: string, pass: string) {
    const user = await this.usersService.findOne(username);

    if (user && (await argon2.verify(user.password, pass))) {
      const { password, ...result } = user;
      return result;
    }
    throw new HttpException('invalid credentials', HttpStatus.UNAUTHORIZED);
  }

  async userSignup(input: CreateUserInput) {
    const hashedPassword = await argon2.hash(input.password);

    const data = { username: input.username, password: hashedPassword };

    return this.usersService.create(data);
  }
}
