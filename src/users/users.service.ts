import { ForbiddenException, Injectable, InternalServerErrorException, NotFoundException, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as argon from 'argon2';
import { ConfigService } from '@nestjs/config';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtGuard } from 'src/auth/guard';
import { Role } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService, private config: ConfigService) {}

  // Add a new user
  async create(createUserDto: CreateUserDto) {
    try {
      const hash = await argon.hash(createUserDto.password);

      const user = await this.prisma.user.create({
        data: {
          email: createUserDto.email,
          name: `${createUserDto.firstname} ${createUserDto.lastname}`,
          hash,
          role: createUserDto.role,
          Gender:createUserDto.gender
        },
        select: {
          id: true,
          email: true,
          createdAt: true,
        },
      });

      try {
        switch (createUserDto.role) {
          case 'ADMIN':
            await this.prisma.admin.create({ data: { userId: user.id } });
            break;
          case 'PARENT':
            await this.prisma.parent.create({ data: { userId: user.id } });
            break;
          case 'TEACHER':
            await this.prisma.teacher.create({ data: { userId: user.id } });
            break;
          case 'DEVELOPER':
            await this.prisma.developer.create({ data: { userId: user.id } });
            break;
          case 'STUDENT':
            break;
          default:
            throw new ForbiddenException('Unrecognized user type');
        }
      } catch (roleError) {
        console.error(`Failed to insert ${createUserDto.role} record:`, roleError);
        throw new InternalServerErrorException(
          `Failed to assign role ${createUserDto.role}`
        );
      }

      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
      }
      throw new InternalServerErrorException('Internal server error');
    }
  }

  // Get a list of all users
  @UseGuards(JwtGuard)
  async findAll() {
    return await this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
      },
    });
  }

  // Find one specific user
  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
      },
    });

    if (!user) {
      throw new NotFoundException('user not found');
    }

    return user;
  }

  // Update a single user
  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      return await this.prisma.user.update({
        where: { id },
        data: updateUserDto,
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          createdAt: true,
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new ForbiddenException('User not found');
        }
      }
      throw new InternalServerErrorException('Could not update user');
    }
  }

  // Delete a single user
  async remove(id: number) {
    try {
      return await this.prisma.user.delete({
        where: { id },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new ForbiddenException('User not found');
        }
      }
      throw new InternalServerErrorException('Could not delete user');
    }
  }



  // find users by a certain role 
  async findByRole(Role:Role){
    return await this.prisma.user.findMany({
      where: {
        role: Role
      }
    })
  }

  // find users on activa state 


  async findByState(status:boolean){
    return this.prisma.user.findMany({
      where:{
        isActive: status
      }
    })
  }

  


}
