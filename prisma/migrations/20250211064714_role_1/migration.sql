-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE');

-- AlterTable
ALTER TABLE "Admin" ADD COLUMN     "gender" "Gender";

-- AlterTable
ALTER TABLE "Teacher" ADD COLUMN     "gender" "Gender";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "Gender" "Gender";
