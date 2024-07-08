import { Module } from '@nestjs/common';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user/user.module';
import { LoginModule } from './login/login.module';
import { AuthModule } from './auth/auth.module';

const NODE_ENV = process.env.NODE_ENV;
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 设为全局模块
      envFilePath: `.env.${NODE_ENV}`,
    }),
    JwtModule.registerAsync({
      global: true,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get('TOKEN_SECRET'),
          signOptions: {
            expiresIn: '1h',
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
    import { AuthGuard } from './auth/auth.guard';
    import { APP_GUARD, Reflector } from '@nestjs/core';
     {
      provide: APP_GUARD,
      useValue: new AuthGuard(new Reflector()),
    }, */
  ],
})
export class AppModule {}
