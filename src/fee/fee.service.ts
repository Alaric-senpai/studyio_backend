import { Injectable } from '@nestjs/common';
import { CreateFeeDto } from './dto/create-fee.dto';
import { UpdateFeeDto } from './dto/update-fee.dto';
import { PrismaService } from '../prisma/prisma.service';
import { FeeStatus } from '@prisma/client';

@Injectable()
export class FeeService {
  constructor(private prisma:PrismaService){}
  async create(createFeeDto: CreateFeeDto) {

    // const prevPayment = await this.prisma.feesRecords.findUnique({
    //   where: {
    //     studentId: createFeeDto.studentId
    //   }
    // })


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

  findStudentRecords(id:number){
    return this.prisma.feesRecords.findMany({
      where: {
        studentId: id
      }
    })
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
