/*
  Warnings:

  - The `status` column on the `Errors` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "ErrorStatus" AS ENUM ('REPORTED', 'RESOLVED');

-- AlterTable
ALTER TABLE "Errors" DROP COLUMN "status",
ADD COLUMN     "status" "ErrorStatus" NOT NULL DEFAULT 'REPORTED';

-- DropEnum
DROP TYPE "error";
