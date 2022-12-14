import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
  Session,
  UseGuards,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthenticatedGuard } from './guards/authenticated.guard';

export type CreateUserInput = {
  username: string;
  password: string;
  confirmPassword: string;
};

interface UserRequest {
  user: User;
}
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Req() req: UserRequest, @Res() res: Response) {
    return res.sendStatus(HttpStatus.OK);
  }

  @Post('logout')
  @UseGuards(AuthenticatedGuard)
  async logout(@Req() req: Request, @Res() res: Response) {
    req.logout((err) => {
      return err ? res.sendStatus(400) : res.sendStatus(200);
    });
  }

  @Post('signup')
  async signUp(@Req() req, @Body() input: CreateUserInput) {
    return await this.authService.userSignup(input);
  }

  @Get('')
  async getAuthSession(@Req() req, @Session() session: Record<string, any>) {
    return session;
  }

  @Get('a')
  @UseGuards(AuthenticatedGuard)
  a() {
    return { msg: 'you are authorized to see this message' };
  }

  @Get('status')
  @UseGuards(AuthenticatedGuard)
  status(@Session() session: Record<string, any>) {
    return session.passport.user;
  }
}
