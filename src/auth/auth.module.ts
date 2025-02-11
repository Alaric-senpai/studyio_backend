import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategy';
import { JwtGuard } from './guard';
import { LogModule } from '../log/log.module';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.HASH_KEY
    }),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),

    LogModule
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, JwtGuard],
  exports:[JwtGuard],
})
export class AuthModule {}
