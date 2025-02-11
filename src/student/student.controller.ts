import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { JwtGuard } from 'src/auth/guard';

@UseGuards(JwtGuard)
@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}


  // publish new student data 

  @Post('new')
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentService.create(createStudentDto);
  }

  // get all students 
  @Get('all')
  findAll() {
    return this.studentService.findAll();
  }


  // get any student 
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentService.findOne(+id);
  }


  // update any student detail 
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentService.update(+id, updateStudentDto);
  }


  // delete a student  user 

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentService.remove(+id);
  }


}
