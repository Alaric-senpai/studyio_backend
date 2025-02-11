import { Module } from '@nestjs/common';
import { ClassService } from './class.service';
import { ClassController } from './class.controller';
import { JwtGuard } from 'src/auth/guard';
import { JwtStrategy } from 'src/auth/strategy';

@Module({
  controllers: [ClassController],
  providers: [ClassService, JwtGuard, JwtStrategy],
  exports: [JwtGuard]

})
export class ClassModule {}
