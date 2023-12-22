import { Injectable } from '@nestjs/common';
import { jwtConstants } from './auth/constant';
@Injectable()
export class AppService {
  getHello(): string {
    // return 'Hello World!';
    // return `${process.env.JWT_CONSTANTS}`;
    return `${process.env.JWT_CONSTANTS}`;
  }
}
