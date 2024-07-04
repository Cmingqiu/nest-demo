import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';

// session
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.use(
    session({
      secret: 'cmq-secret-key',
      name: 'c-session',
      cookie: { maxAge: 60000 }, // 60s
      rolling: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();
