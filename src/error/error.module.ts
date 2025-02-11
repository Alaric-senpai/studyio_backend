import { Module } from '@nestjs/common';
import { ErrorService } from './error.service';
import { ErrorController } from './error.controller';
import { JwtGuard } from 'src/auth/guard';
import { JwtStrategy } from 'src/auth/strategy';

@Module({
  controllers: [ErrorController],
  providers: [ErrorService, JwtStrategy, JwtGuard],
  exports: [JwtGuard]
})
export class ErrorModule {}
