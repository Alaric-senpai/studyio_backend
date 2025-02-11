import { ForbiddenException, Injectable, NotFoundException, UseGuards } from '@nestjs/common';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { PrismaService } from '../prisma/prisma.service';
import { JwtGuard } from 'src/auth/guard';

@UseGuards(JwtGuard)
@Injectable()
export class ClassService {
  constructor(private prisma:PrismaService){}
  create(createClassDto: CreateClassDto) {
    return this.prisma.class.create({
      data: createClassDto
    })
  }
  findAll() {
    return this.prisma.class.findMany({})
  }
  async findOne(id: number) {
    const clss = await this.prisma.class.findUnique({
      where:{
        id:id
      }
    })

    if(!clss){
      throw new NotFoundException('class record does not exist')
    }
  }
  async update(id: number, updateClassDto: UpdateClassDto) {
    const upd = await this.prisma.class.update({
      where: {
        id:id
      },
      data:updateClassDto,
      select: {
        id:true,
        name:true
      }
    })

    if(upd){
      throw new ForbiddenException('record cannot be updated')
    }

    return upd
  }
  remove(id: number) {
    return this.prisma.class.delete({
      where:{
        id:id
      }
    })
  }


  



}
