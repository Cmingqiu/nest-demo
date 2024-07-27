import { Module } from '@nestjs/common';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from '@/user/user.module';
import { LoginModule } from '@/login/login.module';

const NODE_ENV = process.env.NODE_ENV;
@Module({
  imports: [
    // 配置注册
    ConfigModule.forRoot({
      isGlobal: true, // 设为全局模块
      envFilePath: `.env.${NODE_ENV}`,
    }),
    // jwt注册
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
    // 数据库 nest-demo 连接
    MongooseModule.forRoot('mongodb://localhost:27017/nest-demo'),
    UserModule,
    LoginModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    /* 全局鉴权守卫
    import { AuthGuard } from '@/common/guards/auth.guard';
    import { APP_GUARD, Reflector } from '@nestjs/core';
     {
      provide: APP_GUARD,
      useValue: new AuthGuard(new Reflector()),
    }, */
  ],
})
export class AppModule {}
