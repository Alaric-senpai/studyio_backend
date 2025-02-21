import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateFeeStructureDto } from './dto/create-fee-structure.dto';
import { UpdateFeeStructureDto } from './dto/update-fee-structure.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Decimal, PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
// import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

@Injectable()
export class FeeStructureService {
  constructor(private prisma: PrismaService) {}

  async create(createFeeStructureDto: CreateFeeStructureDto) {
    try {
      return await this.prisma.feeStructure.create({
        data: {
          title: createFeeStructureDto.title,
          Amount: createFeeStructureDto.Amount,  // ✅ Fix Amount handling
          Term: createFeeStructureDto.Term,
          Class: createFeeStructureDto.Class
        },
        select: {
          id: true
        }
      });
    } catch (error) {
      throw new ForbiddenException('Could not create fee structure');
    }
  }

  async findAll() {
    return this.prisma.feeStructure.findMany();
  }

  async findOne(id: number) {
    const structure = await this.prisma.feeStructure.findUnique({
      where: { id }
    });

    if (!structure) {
      throw new NotFoundException('Fee structure does not exist');
    }

    return structure;
  }

  async update(id: number, updateFeeStructureDto: UpdateFeeStructureDto) {
    const existingStructure = await this.prisma.feeStructure.findUnique({
      where: { id }
    });

    if (!existingStructure) {
      throw new NotFoundException('Fee structure not found');
    }

    return await this.prisma.feeStructure.update({
      where: { id },
      data: updateFeeStructureDto,
      select: { title: true }
    });
  }

  async remove(id: number) {
    try {
      return await this.prisma.feeStructure.delete({
        where: { id },
        select: { title: true }
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
        throw new NotFoundException('Fee structure not found');
      }
      throw new ForbiddenException('Could not delete fee structure');
    }
  }
}
