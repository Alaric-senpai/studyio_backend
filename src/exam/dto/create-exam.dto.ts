import { IsBoolean, IsDateString, IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateExamDto {
    @IsNotEmpty()
    @IsInt() // ✅ Changed from @IsNumber() to @IsInt() to match Prisma Int type
    creator: number;

    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    type: string;

    @IsNotEmpty()
    @IsBoolean()
    isActive: boolean;

    @IsNotEmpty()
    @IsDateString() // ✅ Matches Prisma's DateTime type
    Startdate: string; // ✅ Matches Prisma field name (capitalized S)

    @IsNotEmpty()
    @IsDateString() // ✅ Matches Prisma's DateTime type
    EndDate: string; // ✅ Matches Prisma field name (capitalized E)
}
