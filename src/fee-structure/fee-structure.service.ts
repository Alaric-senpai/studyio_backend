import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateFeeStructureDto } from './dto/create-fee-structure.dto';
import { UpdateFeeStructureDto } from './dto/update-fee-structure.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FeeStructureService {
  constructor(private prisma:PrismaService){}
  create(createFeeStructureDto: CreateFeeStructureDto) {
    return this.prisma.feeStructure.create({
      data: {
        title: createFeeStructureDto.title,
        Amount: parseFloat(createFeeStructureDto.Amount),
        Term: createFeeStructureDto.Term,
        Class: createFeeStructureDto.Class
      },
      select: {
        id:true
      }
    })
  }

  findAll() {
    return this.prisma.feeStructure.findMany()
  }

  async findOne(id: number) {
    const structure = await this.prisma.feeStructure.findUnique({
      where: {
        id: id
      }
    })

    if(!structure){
      throw new NotFoundException('Fee strucutre does not exist')
    }

    return structure
  }

  async update(id: number, updateFeeStructureDto: UpdateFeeStructureDto) {
    const upd = await this.prisma.feeStructure.update({
      where: {
        id: id
      },
      data:updateFeeStructureDto,
      select: {
        title: true
      }
    })

    if(!upd){
      throw new ForbiddenException('Document to update not found')
    }

    return upd
  }

  remove(id: number) {
    return this.prisma.feeStructure.delete({
      where: {
        id:id
      },
      select: {
        title: true
      }
    })
  }
}
