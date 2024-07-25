import { Module } from '@nestjs/common';

import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { UserModule } from '@/user/user.module';

@Module({
  imports: [UserModule],
  controllers: [LoginController],
  providers: [LoginService],
})
export class LoginModule {}
