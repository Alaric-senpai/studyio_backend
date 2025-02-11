import { Injectable } from '@nestjs/common';
import { logsDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LogService {
    constructor(private prisma:PrismaService){}

    async createLog(logdata:logsDto){
        const log = await this.prisma.log.create({
            data:logdata
        })
        if(!log){
            console.log('log not stored')
        }
        return {
            success:true
        }
    }
}
