import { NestFactory, Reflector } from '@nestjs/core';
import { ValidationPipe, VersioningType } from '@nestjs/common';

// session
import * as session from 'express-session';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';
import { AuthGuard } from '@/common/guards/auth.guard';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { ResponseFormatInterceptor } from './common/interceptors/responseFormat';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'debug', 'error', 'warn'],
  });
  // 获取配置服务
  const configService = app.get(ConfigService);
  const NODE_ENV = configService.get('NODE_ENV');
  const origin: CorsOptions['origin'] = [];
  if (NODE_ENV === 'development') {
    // 开发环境
    origin.push(/^https?:\/\/localhost:*/);
  }
  // 开启CORS
  app.enableCors({
    origin,
    credentials: true, // 允许携带凭证信息
    // methods: 'GET,POST', // 只允许GET和POST请求
  });

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
      resave: false,
      saveUninitialized: true,
    }),
  );
  // 全局拦截器
  app.useGlobalInterceptors(new ResponseFormatInterceptor());
  // 全局鉴权守卫
  app.useGlobalGuards(
    new AuthGuard(new Reflector(), new JwtService(), new ConfigService()),
  );
  // 开启全局验证管道
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
