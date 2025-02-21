import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  Req,
  UseGuards
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { CreateUploadDto } from './dto/create-upload.dto';
import { UpdateUploadDto } from './dto/update-upload.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express, Request } from 'express';
import { diskStorage } from 'multer';
import { FILE_UPLOAD_DESTINATION, filenameValidate } from '../../constants';
import { JwtGuard } from 'src/auth/guard';

@UseGuards(JwtGuard)
@Controller('files')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: FILE_UPLOAD_DESTINATION,
      filename: filenameValidate,
    }),
    limits: {
      fileSize: 1000 * 1000 * 20, // 20MB limit
    },
    fileFilter: (req, file, callback) => {
      if (file.mimetype.startsWith('video/')) {
        return callback(new BadRequestException('Video files are not allowed!'), false);
      }
      callback(null, true);
    }
    
  }))
  create(@UploadedFile() file: Express.Multer.File, @Body() createUploadDto: CreateUploadDto, @Req() req:Request) {
    if (!file) {
      throw new BadRequestException('File was not uploaded');
    }
    const user = req.user
    // console.log(req)
    console.log('users', user)
    return this.uploadService.create(file, createUploadDto, user);
  }

  @Get()
  findAll() {
    return this.uploadService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.uploadService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUploadDto: UpdateUploadDto) {
    return this.uploadService.update(+id, updateUploadDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.uploadService.remove(+id);
  }
}
