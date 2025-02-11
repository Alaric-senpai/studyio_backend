import { IsInt, IsEnum, IsBoolean, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { CurrentClass, StudentStatus } from '@prisma/client';

export class CreateStudentDto {
  @IsInt()
  @Type(() => Number)
  userId: number;

  @IsEnum(CurrentClass)
  classId: CurrentClass;

  @IsEnum(StudentStatus)
  @IsOptional()
  status?: StudentStatus;

  @IsBoolean()
  @IsOptional()
  isPrefect?: boolean;

}
