import { Injectable } from '@nestjs/common';
import { LoginBody } from './dto/login.dto';

@Injectable()
export class LoginService {
  login(params: LoginBody) {
    // Implement your login logic here
    return params.username + ' | ' + params.password;
  }
}
