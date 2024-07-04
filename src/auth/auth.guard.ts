import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

import { JwtService } from '@nestjs/jwt';

import { Roles } from './roles.decorator';

//  白名单
const whiteRoutes = ['login'];

export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
  ) {}
  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const token = this.extractTokenFromRequest(req);
    const whiteRoute = this.isWhiteRoute(req.url);
    if (whiteRoute) return true;
    // 未携带token
    if (!token) throw new UnauthorizedException();

    const a = await this.validateToken(token);
    console.log('a: ', a);
    const roles = this.reflector.get(Roles, context.getHandler());
    if (!roles) return true;

    console.log(roles, req.url);
    return !!req;
  }
  // 提取token
  extractTokenFromRequest(req: Request) {
    return req.headers['access-token'];
  }
  // 校验token
  async validateToken(token) {
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: 'secretKey',
      });
      return payload;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  isWhiteRoute(url: string): boolean {
    return whiteRoutes.some((route) => url.includes(route));
  }
}
