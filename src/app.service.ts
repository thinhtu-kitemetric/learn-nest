import { Injectable, Req } from '@nestjs/common';
@Injectable()
export class AppService {
  getHello(@Req() req: Request) {
    return {
      data: `Hello world`,
    };
  }
}
