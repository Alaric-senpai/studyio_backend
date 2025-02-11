import { IsEmail, IsNotEmpty, IsString, isString } from "class-validator";

export class LoginDto {
    @IsEmail()
    @IsNotEmpty()
    email:string;

    @IsString()
    @IsNotEmpty()
    password:string;
}