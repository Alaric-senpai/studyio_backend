import { CurrentClass } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
import { IsDecimal, IsInt, IsNotEmpty, IsNotEmptyObject, IsString } from "class-validator";

export class CreateFeeStructureDto {

    @IsString()
    @IsNotEmpty()
    title:string;
    @IsNotEmpty()
    @IsDecimal()
    Amount:any;
    @IsNotEmpty()
    @IsInt()
    Term: number;
    @IsNotEmpty()
    Class: CurrentClass;

}
