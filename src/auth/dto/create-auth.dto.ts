import { IsEmail, IsNotEmpty, isNotEmpty, IsString } from "class-validator";

export class CreateAuthDto {
    @IsEmail()
    @IsNotEmpty()
    email:string;
    @IsString()
    @IsNotEmpty()
    password:string;
}
