import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { SessionSerializer } from './session.serializer';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, SessionSerializer, PrismaService],
})
export class AuthModule {}
