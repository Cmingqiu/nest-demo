import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { tap, map } from 'rxjs/operators';

export class ResponseFormatInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    const ctx = context.switchToHttp();
    const req = ctx.getRequest();
    const res = ctx.getResponse();
    console.log(
      `${new Date().toLocaleString()} : ${req.url} - ${JSON.stringify(req.query)}`,
    );
    // console.log(res);
    return next.handle().pipe(tap((d) => console.log('after..', d)));
  }
}
