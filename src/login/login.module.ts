import { Module } from '@nestjs/common';

import { JwtModule } from '@nestjs/jwt';

import { LoginController } from './login.controller';
import { LoginService } from './login.service';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: 'secretKey',
      signOptions: { expiresIn: '60s' }, // token有效时间
    }),
  ],
  controllers: [LoginController],
  providers: [LoginService],
})
export class LoginModule {}
