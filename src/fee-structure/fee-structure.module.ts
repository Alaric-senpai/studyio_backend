import { Module } from '@nestjs/common';
import { FeeStructureService } from './fee-structure.service';
import { FeeStructureController } from './fee-structure.controller';
import { JwtGuard } from 'src/auth/guard';
import { JwtStrategy } from 'src/auth/strategy';

@Module({
  controllers: [FeeStructureController],
  providers: [FeeStructureService, JwtGuard, JwtStrategy],
})
export class FeeStructureModule {}
