import { Module } from '@nestjs/common';
import { ExamService } from './exam.service';
import { ExamController } from './exam.controller';
import { JwtStrategy } from 'src/auth/strategy';
import { JwtGuard } from 'src/auth/guard';

@Module({
  controllers: [ExamController],
  providers: [ExamService, JwtGuard, JwtStrategy],
  exports: [JwtGuard]
})
export class ExamModule {}
