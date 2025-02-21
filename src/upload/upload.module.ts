import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { JwtGuard } from 'src/auth/guard';
import { JwtStrategy } from 'src/auth/strategy';

@Module({
  controllers: [UploadController],
  providers: [UploadService, JwtStrategy, JwtGuard],
  exports: [JwtGuard]
})
export class UploadModule {}
