import { IsDate, IsNotEmpty, IsNumber, isNumber, IsString } from "class-validator";

export class CreateExamDto {
    @IsNotEmpty()
    @IsNumber()
    creator:number;
    @IsNotEmpty()
    @IsString()
    title:string;
    @IsNotEmpty()
    @IsString()
    type:string;
    @IsNotEmpty()
    @IsString()
    isActive:boolean;
    @IsNotEmpty()
    @IsDate()
    Startdate:Date;
    @IsNotEmpty()
    @IsDate()
    EndDate:Date ;
}
