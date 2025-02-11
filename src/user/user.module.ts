import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../auth/strategy/jwt.strategy'; // 👈 Import JwtStrategy
import { JwtGuard } from '../auth/guard/jwt.guard'; // 👈 Import JwtGuard

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }), // 👈 Ensure Passport is initialized
    JwtModule.register({
      global:true,
      secret: process.env.HASH_KEY || 'default_secret', // 👈 Ensure JWT secret is set
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [UserController],
  providers: [UserService, JwtStrategy, JwtGuard], // 👈 Register JwtStrategy and JwtGuard
  exports: [JwtGuard], // 👈 Export JwtGuard so it can be used
})
export class UserModule {}
