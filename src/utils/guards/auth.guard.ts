import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { Roles } from '@/auth/roles.decorator';
import { NO_AUTH } from '@/common/decorators/NoAuth';

//  白名单
const whiteRoutes = ['login'];

export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const token = this.extractTokenFromRequest(req);
    const whiteRoute = this.isWhiteRoute(req.url);

    const noAuth = this.reflector.getAllAndOverride<boolean>(NO_AUTH, [
      context.getHandler(),
      context.getClass(),
    ]);

    // 白名单路由 或者 指定不校验的controller 跳过校验
    if (whiteRoute || noAuth) return true;
    // 未携带token返回401
    if (!token) throw new UnauthorizedException();
    // 解析jwt对应的参数值
    const tokenPayload = await this.validateToken(token);
    // 拿到角色
    const roles = this.reflector.get(Roles, context.getHandler());
    if (!roles) return true; // matchRoles(roles,req);

    return !!req;
  }
  0;
  // 提取token
  extractTokenFromRequest(req: Request) {
    return req.headers['access-token'];
  }
  // 校验token
  async validateToken(token) {
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get('TOKEN_SECRET'),
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
