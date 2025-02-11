import { error } from "@prisma/client"
import { IsNotEmpty, IsString } from "class-validator"

export class CreateErrorDto {
    @IsNotEmpty()
    @IsString()
    type:string
    @IsNotEmpty()
    @IsString()
    status?:error
    @IsNotEmpty()
    @IsString()
    description?:string
    @IsNotEmpty()
    @IsString()
    ErrorMsg:string
    @IsNotEmpty()
    @IsString()    
    ReportedBy:number
}
