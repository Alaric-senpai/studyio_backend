import { IsOptional, IsString, isString } from "class-validator";

export class CreateUploadDto {
    @IsOptional()
    @IsString()
    description?:string;
}
