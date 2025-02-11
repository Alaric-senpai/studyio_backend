import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { JwtGuard } from 'src/auth/guard';
import { JwtStrategy } from 'src/auth/strategy';

@Module({
  controllers: [EventController],
  providers: [EventService, JwtGuard, JwtStrategy],
  exports: [JwtGuard]
})
export class EventModule {}
