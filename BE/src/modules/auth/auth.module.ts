import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { JwtGuard } from './guards/jwt.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { LocalStrategy } from './strategies/local.startegy';
import { JwtStrategy } from './strategies/jwt.startegy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, LocalAuthGuard, LocalStrategy, JwtGuard, JwtStrategy],
  imports: [UserModule],
  exports: [JwtGuard]
})
export class AuthModule {}
