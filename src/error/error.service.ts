import { BadRequestException, ConflictException, ForbiddenException, Injectable, MethodNotAllowedException, NotFoundException, PreconditionFailedException } from '@nestjs/common';
import { CreateErrorDto } from './dto/create-error.dto';
import { UpdateErrorDto } from './dto/update-error.dto';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class ErrorService {
  constructor(private prisma:PrismaService){}
  async create(createErrorDto: CreateErrorDto) {
    const crt = await this.prisma.errors.create({
      data:createErrorDto,
      select: {
        id:true
      }
    })

    if(!crt){
      throw new PreconditionFailedException('faile');
    }

    return {...crt, message: 'error registered succesfully'}
  }

  findAll() {
    return this.prisma.errors.findMany()
  }

  async findOne(id: number) {
    const error = await this.prisma.errors.findUnique({
      where:{
        id:id
      }
    })

    if(!error){
      throw new NotFoundException('error does not exist')
    }

    return error
  }
  first
  async update(id: number, updateErrorDto: UpdateErrorDto) {
    const upd = await this.prisma.errors.update({
      where: {
        id:id
      },
      data: updateErrorDto,
      select: {
        id:true
      }
    })

    if(!upd){
      throw new ForbiddenException('update failed')
    }

    return {...upd, message: 'error updated succesfuly'}
  }

 async remove(id: number) {
  try {
    
    const err =  await this.prisma.errors.delete({
      where: {
        id:id
      },
      select: {
        id:true
      }
    })

    if(!err){
      throw new BadRequestException('request is bad')
    }

    return {message:'error deleted sucessfully'}
  } catch (error) {
    if(error instanceof PrismaClientKnownRequestError){
      if(error.code === 'P2025'){
        throw new ConflictException('error alrready deleted')
      }
    }
  }
  throw new NotFoundException()
}
}
