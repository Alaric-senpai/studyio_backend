import { Controller, UseGuards } from '@nestjs/common';
import { LogService } from './log.service';
import { JwtGuard } from 'src/auth/guard';

@UseGuards(JwtGuard)
@Controller('log')
export class LogController {
  constructor(private readonly logService: LogService) {

    

  }
}
