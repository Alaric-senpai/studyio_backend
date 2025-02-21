import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUploadDto } from './dto/create-upload.dto';
import { UpdateUploadDto } from './dto/update-upload.dto';
import { Express } from 'express';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UploadService {
  constructor(private prisma:PrismaService){}
  async create(file: Express.Multer.File, createUploadDto: CreateUploadDto, user:any) {

    const composeDto = {
      userId: user.id,
      filename: file.originalname,
      filepath: file.path,
      mimetype:file.mimetype
    }

    const addFlle = await this.prisma.documentUpload.create({
      data: {
        userId: composeDto.userId,
        filename: composeDto.filename,
        url: composeDto.filepath,
        description: createUploadDto.description,
        MimeType: composeDto.mimetype,
        priority: 'NORMAL',
        storageProvider: 'local'
      },
      select :{
        filename: true,
        id: true,
        url:true,
      }
    })

    if(!addFlle){
      throw new BadRequestException('Storage request failed')
    }

    return {...addFlle, message: 'File uploaded sucessfull'}
  }

  async findAll() {
    const records  = await this.prisma.documentUpload.findMany()

    if(!records){
      throw new NotFoundException('records do not exist')
    }
    return records;
  }

  async findOne(id: number) {
    const record = await this.prisma.documentUpload.findUnique({
      where: {
        id
      }
    })
    if(!record){
      throw new NotFoundException('record not found')
    }
    return record
  }

  update(id: number, updateUploadDto: UpdateUploadDto) {
    return `This action updates a #${id} upload`;
  }

  async remove(id: number) {
    const delrecord =  await this.prisma.documentUpload.delete({
      where: {
        id
      }
    })
    if(!delrecord){
      throw new BadRequestException('record not deleted')
    }
    return { message: 'record was deleted succesfully' }
  }
}
