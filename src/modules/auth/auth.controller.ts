import { Controller, Post, Request, UseGuards, Logger } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return {user: req.user};
  }
}
