import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { JwtGuard } from 'src/auth/guard';
import { JwtStrategy } from 'src/auth/strategy';

@Module({
  controllers: [StudentController],
  providers: [StudentService, JwtGuard, JwtStrategy],
  exports: [JwtGuard]
})
export class StudentModule {}
