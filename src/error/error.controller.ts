import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ErrorService } from './error.service';
import { CreateErrorDto } from './dto/create-error.dto';
import { UpdateErrorDto } from './dto/update-error.dto';
import { JwtGuard } from 'src/auth/guard';

@UseGuards(JwtGuard)
@Controller('error')
export class ErrorController {
  constructor(private readonly errorService: ErrorService) {}

  @Post()
  create(@Body() createErrorDto: CreateErrorDto) {
    return this.errorService.create(createErrorDto);
  }

  @Get()
  findAll() {
    return this.errorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.errorService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateErrorDto: UpdateErrorDto) {
    return this.errorService.update(+id, updateErrorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.errorService.remove(+id);
  }
}
