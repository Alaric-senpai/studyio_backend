import { ConsoleLogger, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateFeeDto } from './dto/create-fee.dto';
import { UpdateFeeDto } from './dto/update-fee.dto';
import { PrismaService } from '../prisma/prisma.service';
import { FeeStatus } from '@prisma/client';

@Injectable()
export class FeeService {
  constructor(private prisma:PrismaService){}
  async create(createFeeDto: CreateFeeDto) {
    console.log(createFeeDto)
    let status:FeeStatus;
    const structure = await this.prisma.feeStructure.findUnique({
      where: {
        id: createFeeDto.structureId
      },
      select: {
        Amount: true
      }
    })

    if(structure?.Amount! > parseFloat(createFeeDto.amount)){

      const balance = structure?.Amount! - parseFloat(createFeeDto.amount)

      return this.prisma.feesRecords.create({
        data: {
          amount: createFeeDto.amount,
          balance,
          studentId: createFeeDto.studentId,
          structureId: createFeeDto.structureId,
          paymentMethod: createFeeDto.paymentMethod,
          status: 'PENDING'
        }
      })

      
      ///
    }else {
      const overpay = parseFloat(createFeeDto.amount) - structure?.Amount!

      if(overpay > 0){

        return this.prisma.feesRecords.create({
          data: {
            amount: createFeeDto.amount,
            overpay,
            studentId: createFeeDto.studentId,
            structureId: createFeeDto.structureId,
            paymentMethod: createFeeDto.paymentMethod,
            status: 'OVERPAID'
          }
        })
      }else {
        return this.prisma.feesRecords.create({
          data: {
            amount: createFeeDto.amount,
            overpay,
            studentId: createFeeDto.studentId,
            structureId: createFeeDto.structureId,
            paymentMethod: createFeeDto.paymentMethod,
            status: 'FULLYPAID'
          }
        })
      }
    }
  }

  findAll() {
    return this.prisma.feesRecords.findMany({})
  }

  findOne(id: number) {
    return this.prisma.feesRecords.findUnique({
      where: {
        id:id
      }
    })
  }

  async findStudentRecords(studentId: number) {
    try {
      const studentFees = await this.prisma.feesRecords.findMany({
        where: {
          studentId: studentId,
        },
      });

      if (!studentFees.length) {
        throw new NotFoundException('No fee records found for this student');
      }

      return studentFees;
    } catch (error) {
      throw new InternalServerErrorException(error.message || 'Failed to retrieve fee records');
    }
  }

  update(id: number, updateFeeDto: UpdateFeeDto) {
    return this.prisma.feesRecords.update({
      where: {
        id:id
      },
      data:updateFeeDto
    })
  }

  remove(id: number) {
    return this.prisma.feesRecords.delete({
      where: {
        id:id
      }
    })
  }
}
