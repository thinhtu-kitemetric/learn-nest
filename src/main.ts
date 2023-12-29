import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

import 'reflect-metadata';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    credentials: true,
    origin: ['http://localhost:3001', 'http://localhost:3000'],
  });
  app.use(cookieParser(process.env.COOKIES_SECRET));
  await app.listen(3000);
}
bootstrap();
