import { Module } from '@nestjs/common';
import { APP_GUARD, Reflector } from '@nestjs/core';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user/user.module';
import { LoginModule } from './login/login.module';
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './auth/auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 设为全局模块
      envFilePath: ['.env.production', '.env.development'],
    }),
    JwtModule.registerAsync({
      global: true,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get('TOKEN_SECRET'),
          signOptions: {
            expiresIn: '60s',
          },
        };
      },
    }),
    UserModule,
    LoginModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    /* 全局鉴权守卫
     {
      provide: APP_GUARD,
      useValue: new AuthGuard(new Reflector()),
    }, */
  ],
})
export class AppModule {}
