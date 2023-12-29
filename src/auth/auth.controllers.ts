import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { AuthDto } from './auth.dto';
import { Request, Response } from 'express';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Req() req, @Res({ passthrough: true }) response: Response) {
    try {
      return this.authService.login(req.user).then(({ access_token }) => {
        response.cookie('access_token', access_token, {
          maxAge: 600 * 1000, // 600s
          signed: true,
          httpOnly: true,
        });
      });
    } catch (err) {
      console.log(err.message);
      return response.status(404).json({
        message: err.message,
      });
    }
  }

  @Post('/sign-up')
  async signup(
    @Body() newUserCredential: AuthDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    try {
      const newUser = await this.authService.signup(newUserCredential);
      return this.authService.login(newUser).then(({ access_token }) => {
        response.cookie('access_token', access_token, {
          maxAge: 600 * 1000, // 600s
          signed: true,
        });
      });
    } catch (err) {
      console.log(err.message);
      return response.status(404).json({
        message: 'username already exists',
      });
    }
  }
}
