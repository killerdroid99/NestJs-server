import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';
import { CreateUserInput } from './auth.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private db: PrismaService) {}

  async validateUser(username: string, pass: string) {
    const user = await this.db.user.findUnique({
      where: { username: username },
    });

    if (user && (await argon2.verify(user.password, pass))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    throw new HttpException('invalid credentials', HttpStatus.UNAUTHORIZED);
  }

  async userSignup(input: CreateUserInput) {
    const hashedPassword = await argon2.hash(input.password);

    const data = { username: input.username, password: hashedPassword };

    const existingUser = await this.db.user.findUnique({
      where: { username: data.username },
    });

    if (existingUser) {
      throw new HttpException(
        'User with this username already exists',
        HttpStatus.CONFLICT,
      );
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...newUser } = await this.db.user.create({
        data: data,
      });

      return newUser;
    }
  }

  async userLogout(sessionId: string) {
    return await this.db.session.delete({
      where: { id: sessionId },
    });
  }

  async clearPreviousSessions(userId: string) {
    const { count } = await this.db.session.deleteMany({
      where: {
        data: {
          contains: `"id":"${userId}"`,
        },
      },
    });

    return count;
  }
}
