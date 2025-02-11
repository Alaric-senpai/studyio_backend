import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ExamService {
  constructor(private prisma:PrismaService){}
  async create(createExamDto: CreateExamDto) {
    const exam = await this.prisma.exam.create(
      {
        data: createExamDto,
        select: {
          id: true,
          title:true
        }
      }  
  )
   return exam

  }

  findAll() {
    return this.prisma.exam.findMany()
  }

  findOne(id: number) {
    const exam = this.prisma.exam.findUnique({
      where: {
        id: id
      }
    })
    if(!exam){
      throw new NotFoundException('exam does not exist')
    }
    return exam
  }

  update(id: number, updateExamDto: UpdateExamDto) {
    return this.prisma.exam.update({
      where: {
        id:id
      },
      data: updateExamDto,
      select: {
        id:true,
        title:true
      }
    })
  }

  remove(id: number) {
    return this.prisma.exam.delete({
      where: {
        id:id
      },
      select: {
        id:true,
        title:true
      }
    })
  }
}
