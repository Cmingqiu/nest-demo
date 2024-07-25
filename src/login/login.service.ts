import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginBody } from './dto/login.dto';

import { Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as svgCaptcha from 'svg-captcha';

import { User } from '@/user/schemas/user.schema';
import { Model } from 'mongoose';

export type ReqWidthCookie = Request & {
  session: { code: string };
};

@Injectable()
export class LoginService {
  constructor(
    private jwtService: JwtService,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}
  async login(res, body: LoginBody, session) {
    const { username, password, code = '' } = body;
    let response = {};

    if (!code) {
      response = { code: -1001, msg: '验证码过期', data: null };
    } else if (session.code?.toLowerCase() !== code.toLowerCase()) {
      response = { code: -1001, msg: '验证码错误', data: null };
    } else {
      const user = await this.userModel.find({ name: username, password });
      if (user.length === 0) {
        response = { code: -100, msg: '用户不存在', data: null };
        return res.send(response);
        // throw new HttpException('用户不存在', HttpStatus.FORBIDDEN);
      }

      const payload = { sub: user[0]._id, username: username };
      const token = await this.jwtService.signAsync(payload);
      response = { code: 0, data: token };
    }
    return res.send(response);
  }

  // 注册
  registry(body) {}

  generateCaptcha(req: ReqWidthCookie, res: Response) {
    const captcha = svgCaptcha.create({
      size: 4, //生成几个验证码
      fontSize: 50, //文字大小
      width: 100, //宽度
      height: 34, //高度
      background: '#cc9966', //背景颜色
    });
    req.session.code = captcha.text; //存储验证码记录到session
    res.type('image/svg+xml').send(captcha.data);
  }
}
