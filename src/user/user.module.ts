import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User, UserSchema } from './schemas/user.schema';

//表名：User   console.log('User.name: ', User.name, User);
@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [MongooseModule /* UserService */], // 1.导出MongooseModule；在其他模块的service中什么model使用；  2.导出UserService给其他模块使用，通过导入UserModal，调用service方法
})
export class UserModule {}
