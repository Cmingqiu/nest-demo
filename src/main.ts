import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';

// session
import * as session from 'express-session';

import { AuthGuard } from './auth/auth.guard';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 开启版本控制，类型为url
  app.enableVersioning({
    type: VersioningType.URI,
  });
  // 使用session
  app.use(
    session({
      secret: 'cmq-secret-key',
      name: 'c-session',
      cookie: { maxAge: 60000 }, // 60s
      rolling: true,
    }),
  );
  // 全局鉴权守卫
  app.useGlobalGuards(
    new AuthGuard(new Reflector(), new JwtService(), new ConfigService()),
  );
  await app.listen(3000);
}
bootstrap();
