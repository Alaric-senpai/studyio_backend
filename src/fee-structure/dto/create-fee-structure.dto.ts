import { CurrentClass } from "@prisma/client";
import { IsNumber, IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateFeeStructureDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    @IsNumber({ allowInfinity: false, allowNaN: false }, { message: "Amount must be a valid number" })
    Amount: number;

    @IsNotEmpty()
    @IsInt()
    Term: number;

    @IsNotEmpty()
    Class: CurrentClass;
}
