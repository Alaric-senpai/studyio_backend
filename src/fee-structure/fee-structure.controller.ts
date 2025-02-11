import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { FeeStructureService } from './fee-structure.service';
import { CreateFeeStructureDto } from './dto/create-fee-structure.dto';
import { UpdateFeeStructureDto } from './dto/update-fee-structure.dto';
import { JwtGuard } from 'src/auth/guard';

@UseGuards(JwtGuard)
@Controller('fee-structure')
export class FeeStructureController {
  constructor(private readonly feeStructureService: FeeStructureService) {}

  @Post()
  create(@Body() createFeeStructureDto: CreateFeeStructureDto) {
    return this.feeStructureService.create(createFeeStructureDto);
  }

  @Get()
  findAll() {
    return this.feeStructureService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.feeStructureService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFeeStructureDto: UpdateFeeStructureDto) {
    return this.feeStructureService.update(+id, updateFeeStructureDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.feeStructureService.remove(+id);
  }
}
