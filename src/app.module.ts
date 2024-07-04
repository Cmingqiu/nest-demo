import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user/user.module';
import { LoginModule } from './login/login.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UserModule, LoginModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
