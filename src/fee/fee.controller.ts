import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { FeeService } from './fee.service';
import { CreateFeeDto } from './dto/create-fee.dto';
import { UpdateFeeDto } from './dto/update-fee.dto';
import { JwtGuard } from 'src/auth/guard';

@UseGuards(JwtGuard)
@Controller('fee')
export class FeeController {
  constructor(private readonly feeService: FeeService) {}

  @Post('pay')
  create(@Body() createFeeDto: CreateFeeDto) {
    return this.feeService.create(createFeeDto);
  }
  @Get('all')
  findAll() {
    return this.feeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.feeService.findOne(+id);
  }


  @Get('by-role')
  findById(@Query('student') student:number){
    return this.feeService.findStudentRecords(student)

  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFeeDto: UpdateFeeDto) {
    return this.feeService.update(+id, updateFeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.feeService.remove(+id);
  }
}
