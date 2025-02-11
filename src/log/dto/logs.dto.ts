import { LogType } from "@prisma/client";

export class logsDto{
    userId:number;
    device:string;
    type:LogType
}