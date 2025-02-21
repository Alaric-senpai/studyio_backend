import { BadRequestException, ForbiddenException, GoneException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

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
    return clss
  }
async update(id: number, data: UpdateClassDto) {

      try {
        const upd = await this.prisma.class.update({
          where: { id },
          data
        });
    
        return upd;
      } catch (error) {
        throw new ForbiddenException('Failed to update record');
      }
    }
    
  async remove(id: number) {
    try {
      const del = await this.prisma.class.delete({
        where:{
          id:id
        }
      })

      if(!del){
        throw new InternalServerErrorException('request failed')
      }

      return {
        message: 'Record deleted succesfully'
      }
      
    } catch (error) {
      if(error instanceof PrismaClientKnownRequestError){
        if(error.code === 'P2025'){
          throw new GoneException('record already deleted')
        }
      }

      throw new BadRequestException('request parameter not met')
    }

  }


  



}
