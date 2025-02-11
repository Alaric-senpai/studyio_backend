import { Module } from '@nestjs/common';
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


@Module({
  imports: [
    // Load environment variables from .env file
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.register({
        global:true
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
    

  ],
})
export class AppModule {}
