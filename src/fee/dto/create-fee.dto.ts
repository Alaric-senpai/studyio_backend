import { FeeStatus } from "@prisma/client";
import { IsDecimal, IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateFeeDto {
    @IsNotEmpty()
    @IsInt()
    structureId:number;
    @IsNotEmpty()
    @IsInt()
    studentId:number;
    @IsNotEmpty()
    @IsDecimal()
    amount:any;
    @IsNotEmpty()
    @IsDecimal()
    balance:any
    @IsNotEmpty()
    @IsString()
    paymentMethod:string;
    // @IsNotEmpty()
    // @IsString()
    // status:FeeStatus
}
