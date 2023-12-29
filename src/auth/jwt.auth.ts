import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Req } from '@nestjs/common';
import { Request } from 'express';
import * as cookieParser from 'cookie-parser';

// import { jwtConstants } from './constant';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        JwtStrategy.extractJWT,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_CONSTANTS,
    });
  }
  private static extractJWT(@Req() req): string | null {
    if (req.signedCookies && req.signedCookies.access_token) {
      return req.signedCookies.access_token;
    }
    if (req.cookies && req.cookies.access_token) {
      return req.cookies.access_token;
    }
    return null;
  }

  async validate(payload: any) {
    return { id: payload.sub, username: payload.username };
  }
}
