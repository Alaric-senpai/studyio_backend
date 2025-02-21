import { ErrorStatus } from "@prisma/client"; // Ensure the correct enum name
import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateErrorDto {
    @IsNotEmpty()
    @IsString()
    type: string;

    @IsOptional()
    @IsEnum(ErrorStatus) // Ensure this is the correct Prisma enum
    status?: ErrorStatus;

    @IsOptional()
    @IsString()
    description?: string;

    @IsNotEmpty()
    @IsString()
    ErrorMsg: string; // Renamed for consistency

    @IsNotEmpty()
    @IsInt()    
    ReportedBy: number; // Renamed for consistency
}
