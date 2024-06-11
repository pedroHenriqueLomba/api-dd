import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants/auth.constants';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '10000000s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [JwtModule],
})
export class AuthModule {}
