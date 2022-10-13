import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

export type CreateUserInput = {
  username: string;
  password: string;
  confirmPassword: string;
};

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req) {
    return {
      msg: `${req.user.username}, you are now successfully authenticated`,
    };
  }

  @Post('signup')
  signUp(@Request() req, @Body() input: CreateUserInput) {
    return this.authService.userSignup(input);
  }
}
