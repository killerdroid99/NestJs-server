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
import { LocalAuthGuard, AuthenticatedGuard } from './local-auth.guard';

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
    return res.send(HttpStatus.OK);
  }

  @Post('logout')
  @UseGuards(AuthenticatedGuard)
  async logout(@Req() req: Request, @Res() res: Response) {
    req.logout((err) => {
      return err ? res.send(400) : res.send(200);
    });
  }

  @Post('signup')
  signUp(@Req() req, @Body() input: CreateUserInput) {
    return this.authService.userSignup(input);
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
  async status(@Req() req: Request, @Res() res: Response) {
    res.send(req.user);
  }
}
