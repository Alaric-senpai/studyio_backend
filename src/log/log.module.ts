import { Module } from '@nestjs/common';
import { LogService } from './log.service';
import { LogController } from './log.controller';
import { JwtGuard } from 'src/auth/guard';
import { JwtStrategy } from 'src/auth/strategy';

@Module({
  controllers: [LogController],
  providers: [LogService, JwtStrategy, JwtGuard],
  exports: [LogService, JwtGuard]
})
export class LogModule {}
