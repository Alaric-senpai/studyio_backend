import { 
  Controller, Get, Post, Body, Patch, Param, Delete, Query, 
  NotFoundException, BadRequestException, 
  UseGuards
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role } from '@prisma/client';
import { JwtGuard } from 'src/auth/guard';

@UseGuards(JwtGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('new')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get('all')
  findAll() {
    return this.usersService.findAll();
  }


  @Get('by-role') // ✅ More specific route name to prevent conflicts
  getByRole(@Query('role') role: string) {
    if (!role) {
      throw new BadRequestException('Role query parameter is required');
    }

    const validRoles = Object.values(Role);
    if (!validRoles.includes(role as Role)) {
      throw new BadRequestException(`Invalid role: ${role}`);
    }

    return this.usersService.findByRole(role as Role);
  }

  @Get('by-status')
  GetbyStatus(@Query('active') active:boolean ){
    return this.usersService.findByState(active)
  }

  @Get(':id') // ✅ Now it won't interfere with 'by-role'
  findOne(@Param('id') id: string) {
    const userId = parseInt(id, 10);
    if (isNaN(userId)) {
      throw new BadRequestException('Invalid user ID');
    }
    return this.usersService.findOne(userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    console.log('invoked');
    console.log(updateUserDto)
    const userId = parseInt(id, 10);
    console.log(userId)
    if (isNaN(userId)) {
      throw new BadRequestException('Invalid user ID');
    }
    return this.usersService.update(userId, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const userId = parseInt(id, 10);
    if (isNaN(userId)) {
      throw new BadRequestException('Invalid user ID');
    }
    return this.usersService.remove(userId);
  }
}
