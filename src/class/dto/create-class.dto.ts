import { EducationLevel, LearningModel } from "@prisma/client";
import { IsString, IsEnum, IsOptional, IsNumber } from "class-validator";
import { Transform } from "class-transformer";

export class CreateClassDto {
    @IsString()
    name: string;

    @IsOptional()
    @IsEnum(EducationLevel)
    level?: EducationLevel;  // Now it's optional

    @IsEnum(LearningModel)
    model: LearningModel;

    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => (value ? Number(value) : value)) // Transform to number if provided
    students?: number;

    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => (value ? Number(value) : value)) // Transform to number if provided
    TimetableCode?: number;
}
