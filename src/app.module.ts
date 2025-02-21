import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { UserModule } from './user/user.module';
import { StudentModule } from './student/student.module';
import { SubjectModule } from './subject/subject.module';
import { UploadModule } from './upload/upload.module';
import { PrismaModule } from './prisma/prisma.module';
import { ParentModule } from './parent/parent.module';
import { LogModule } from './log/log.module';
import { FeeStructureModule } from './fee-structure/fee-structure.module';
import { FeeModule } from './fee/fee.module';
import { ClassModule } from './class/class.module';
import { EventModule } from './event/event.module';
import { AssignmentModule } from './assignment/assignment.module';
import { BlogModule } from './blog/blog.module';
import { LoggerMiddleware } from './logger.middleware';
import { ErrorModule } from './error/error.module';
import { ExamModule } from './exam/exam.module';
import { MulterModule } from '@nestjs/platform-express';
import { FILE_UPLOAD_DESTINATION } from '../constants';


@Module({
  imports: [
    // Load environment variables from .env file
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.register({
        global:true
    }),
    MulterModule.register({
      dest:FILE_UPLOAD_DESTINATION,
      limits: {
        fileSize: 1000 * 1000 * 20
      }
    }),
    AuthModule,
    UsersModule,
    UserModule,
    StudentModule,
    SubjectModule,
    UploadModule,
    PrismaModule,
    ParentModule,
    LogModule,
    FeeStructureModule,
    FeeModule,
    ClassModule,
    EventModule,
    BlogModule,
    ErrorModule,
    ExamModule

  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*')
  }
}
