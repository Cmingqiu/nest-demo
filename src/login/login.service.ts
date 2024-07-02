import { Injectable } from '@nestjs/common';
import { LoginBody } from './dto/login.dto';

import * as svgCaptcha from 'svg-captcha';
import { Request, Response } from 'express';

export type ReqWidthCookie = Request & {
  session: { code: string };
};

@Injectable()
export class LoginService {
  login(res, params: LoginBody, session) {
    const { username, password, code = '' } = params;
    console.log(session);
    if (session.code?.toLowerCase() !== code.toLowerCase()) {
      return res.status(403).send({ code: -1, msg: 'error' });
    }
    return res.send({ code: 0, msg: username + ' | ' + password });
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
