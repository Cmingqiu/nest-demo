import { Body, Controller, Post, Req, Session } from '@nestjs/common';
import { LoginService } from './login.service';
import { Request } from 'express';
import { LoginBody } from './dto/login.dto';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}
  @Post()
  login(@Req() req: Request, @Session() session, @Body() body: LoginBody) {
    const { username, password } = body;
    console.log('session:', session);
    return this.loginService.login({ username, password });
  }
}
