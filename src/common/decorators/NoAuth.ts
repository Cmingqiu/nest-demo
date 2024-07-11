import { SetMetadata } from '@nestjs/common';

export const NO_AUTH = 'no-auth';
// 创建一个不鉴权的装饰器
export const NoAuth = () => SetMetadata(NO_AUTH, true);
