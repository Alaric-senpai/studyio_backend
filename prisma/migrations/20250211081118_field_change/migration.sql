/*
  Warnings:

  - You are about to drop the column `Gender` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "Gender",
ADD COLUMN     "gender" "Gender";
