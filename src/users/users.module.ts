import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from './users.service';

@Module({
  exports: [UsersService],
  providers: [UsersService, PrismaService],
})
export class UsersModule {}
