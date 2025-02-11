/*
  Warnings:

  - You are about to drop the column `date` on the `Exam` table. All the data in the column will be lost.
  - You are about to drop the column `subjectId` on the `Exam` table. All the data in the column will be lost.
  - Added the required column `EndDate` to the `Exam` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Startdate` to the `Exam` table without a default value. This is not possible if the table is not empty.
  - Added the required column `creator` to the `Exam` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Assignment" DROP CONSTRAINT "Assignment_subjectId_fkey";

-- DropForeignKey
ALTER TABLE "Exam" DROP CONSTRAINT "Exam_subjectId_fkey";

-- DropForeignKey
ALTER TABLE "Result" DROP CONSTRAINT "Result_examId_fkey";

-- AlterTable
ALTER TABLE "Exam" DROP COLUMN "date",
DROP COLUMN "subjectId",
ADD COLUMN     "EndDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "Startdate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "creator" INTEGER NOT NULL,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;
