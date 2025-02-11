import { EducationLevel, LearningModel } from "@prisma/client";

export class CreateClassDto {
    name:string;
    level:EducationLevel
    model:LearningModel
    students?:number;
    TimetableCode?:number;
}
