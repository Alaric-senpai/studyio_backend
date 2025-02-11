import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { JwtGuard } from 'src/auth/guard';
import { JwtStrategy } from 'src/auth/strategy';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [UsersController,],
  providers: [UsersService, JwtGuard, JwtStrategy],

  exports: [JwtGuard]
})
export class UsersModule {}
