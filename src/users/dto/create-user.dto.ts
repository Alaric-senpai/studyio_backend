import { Gender, Role } from "@prisma/client";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    firstname:string;
    @IsString()
    @IsNotEmpty()
    lastname:string;
    @IsString()
    @IsNotEmpty()
    role:Role;
    @IsEmail()
    email:string;
    @IsString()
    @IsNotEmpty()
    password:string;
    @IsNotEmpty()
    phone:number|String;
    address?:String;
    gender:Gender    
}
// enum Role {
//     ADMIN,
//     TEACHER,
//     STUDENT,
//     PARENT,
//     DEVELOPER
// }
  