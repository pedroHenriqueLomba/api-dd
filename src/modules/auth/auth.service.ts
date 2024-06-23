import { HttpException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { LoginDto } from './dtos/login.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.userService.findToLogin(loginDto.email);
    console.log(user.password);
    if (user && bcrypt.compare(loginDto.password, user.password)) {
      const payload = { email: user.email, id: user._id, name: user.name };
      return { access_token: this.jwtService.sign(payload) };
    }
    throw new HttpException('Invalid credentials', 401);
  }
}
