import { Gender, Role } from "@prisma/client";
import { IsEmail, IsNotEmpty, IsString, IsOptional, IsEnum } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    firstname: string;

    @IsString()
    @IsNotEmpty()
    lastname: string;

    @IsEnum(Role)
    @IsNotEmpty()
    role: Role;

    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    phone: number | string;

    @IsOptional()
    @IsString()
    address?: string;

    @IsOptional()  // Marked as optional here
    @IsEnum(Gender)
    gender?: Gender;
}
