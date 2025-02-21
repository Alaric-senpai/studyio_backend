import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class ExamService {
  constructor(private prisma:PrismaService){}
  async create(createExamDto: CreateExamDto) {
    const exam = await this.prisma.exam.create(
      {
        data:createExamDto,
        select: {
          id: true,
          title:true
        }
      }  
  )
   return {...exam, message:'Exam registered succesfully'}

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
    return {message: 'Exam found',...exam}
  }

  async update(id: number, updateExamDto: UpdateExamDto) {
    const upd = await this.prisma.exam.update({
      where: {
        id:id
      },
      data: updateExamDto,
      select: {
        id:true,
        title:true
      }
    })

    if(!upd){
      throw new NotFoundException('exam does not exist')
    }

    return {...upd, message: 'exam updated succesfully'}
  }

  async remove(id: number) {
    try {
        const deletedExam = await this.prisma.exam.delete({
            where: { id },
            select: { id: true, title: true }
        });

        return deletedExam;
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            // Handle specific Prisma error codes
            if (error.code === 'P2025') {  
                throw new NotFoundException(`Exam with ID ${id} not found`);
            }
        }
        throw new InternalServerErrorException('An error occurred while deleting the exam');
    }
}
}