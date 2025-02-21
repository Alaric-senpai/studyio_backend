import { Request } from "express";
import { join } from "path";

export const FILE_UPLOAD_DESTINATION = join(process.cwd(), 'src', 'uploaded_files');

export const filenameValidate = (req: Request, file: Express.Multer.File, callback: (error: any, filename: string) => void) => {
  const fileExtName = file.originalname.split('.').pop();
  const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
  callback(null, `${file.fieldname}-${uniqueSuffix}.${fileExtName}`);
};
