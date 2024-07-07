import { Injectable } from '@nestjs/common';
import { LoginBody } from './dto/login.dto';

import { JwtService } from '@nestjs/jwt';

import * as svgCaptcha from 'svg-captcha';
import { Request, Response } from 'express';

export type ReqWidthCookie = Request & {
  session: { code: string };
};

@Injectable()
export class LoginService {
  constructor(private jwtService: JwtService) {}
  async login(res, body: LoginBody, session) {
    const { username, password, code = '' } = body;
    let response = {};
    if (!code) {
      response = { code: -1001, msg: '验证码过期', data: null };
    } else if (session.code?.toLowerCase() !== code.toLowerCase()) {
      response = { code: -1001, msg: '验证码错误', data: null };
    } else {
      const payload = { sub: 'userId', username: username };
      const token = await this.jwtService.signAsync(payload);
      response = { code: 0, data: token };
    }
    return res.send(response);
  }

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
