import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './utils/local.strategy';
import { SessionSerializer } from './utils/session.serializer';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, SessionSerializer, PrismaService],
})
export class AuthModule {}
