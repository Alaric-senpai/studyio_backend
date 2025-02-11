/*
  Warnings:

  - You are about to drop the `_AssignmentToStudent` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `term` to the `StudentLeaders` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Result" DROP CONSTRAINT "Result_studentId_fkey";

-- DropForeignKey
ALTER TABLE "_AssignmentToStudent" DROP CONSTRAINT "_AssignmentToStudent_A_fkey";

-- DropForeignKey
ALTER TABLE "_AssignmentToStudent" DROP CONSTRAINT "_AssignmentToStudent_B_fkey";

-- AlterTable
ALTER TABLE "StudentLeaders" ADD COLUMN     "term" TEXT NOT NULL;

-- DropTable
DROP TABLE "_AssignmentToStudent";
