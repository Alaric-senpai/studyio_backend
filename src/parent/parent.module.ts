import { Module } from '@nestjs/common';
import { ParentService } from './parent.service';
import { ParentController } from './parent.controller';
import { JwtGuard } from 'src/auth/guard';
import { JwtStrategy } from 'src/auth/strategy';

@Module({
  controllers: [ParentController],
  providers: [ParentService, JwtGuard, JwtStrategy],
  exports: [JwtGuard]
})
export class ParentModule {}
