import { Module } from '@nestjs/common';
import { FeeService } from './fee.service';
import { FeeController } from './fee.controller';
import { JwtGuard } from 'src/auth/guard';
import { JwtStrategy } from 'src/auth/strategy';

@Module({
  controllers: [FeeController],
  providers: [FeeService, JwtGuard, JwtStrategy],
  exports: [JwtGuard]
})
export class FeeModule {}
