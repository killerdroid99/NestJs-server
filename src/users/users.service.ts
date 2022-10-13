import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/auth/dtos/CreateUserDto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private db: PrismaService) {}

  findOne(username: string) {
    // return this.users.find((user) => user.username === username);
    return this.db.user.findUnique({
      where: {
        username,
      },
    });
  }

  async create(createUserDto: CreateUserDto) {
    return await this.db.user.create({ data: createUserDto });
  }
}
