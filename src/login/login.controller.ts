import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  Res,
  Session,
} from '@nestjs/common';
import { LoginService, ReqWidthCookie } from './login.service';
import { Response } from 'express';
import { LoginBody } from './dto/login.dto';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}
  @Post()
  @HttpCode(200)
  login(@Res() res, @Session() session, @Body() body: LoginBody) {
    return this.loginService.login(res, body, session);
  }

  // 验证码路由
  @Get('captcha')
  captcha(@Req() req: ReqWidthCookie, @Res() res: Response) {
    return this.loginService.generateCaptcha(req, res);
  }
}
