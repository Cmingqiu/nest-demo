import { IsArray, IsDate, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  password: string;

  @IsNumber()
  age: number;

  article: string;

  @IsArray()
  roles: string[];

  @IsDate()
  createTime: number;
}
