import { Module } from '@nestjs/common';
import { SubjectService } from './subject.service';
import { SubjectController } from './subject.controller';
import { JwtGuard } from 'src/auth/guard';
import { JwtStrategy } from 'src/auth/strategy';

@Module({
  controllers: [SubjectController],
  providers: [SubjectService, JwtGuard, JwtStrategy],
  exports: [JwtGuard]
})
export class SubjectModule {}
