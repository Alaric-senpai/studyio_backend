/*
  Warnings:

  - You are about to drop the `Fee` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `type` to the `Exam` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Exam" ADD COLUMN     "type" TEXT NOT NULL;

-- DropTable
DROP TABLE "Fee";

-- CreateTable
CREATE TABLE "FeeStructure" (
    "id" SERIAL NOT NULL,
    "Amount" DOUBLE PRECISION NOT NULL,
    "Term" INTEGER NOT NULL,
    "Class" "CurrentClass" NOT NULL,

    CONSTRAINT "FeeStructure_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FeesRecords" (
    "id" SERIAL NOT NULL,
    "structureId" INTEGER NOT NULL,
    "studentId" INTEGER NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "paymentMethod" TEXT NOT NULL,
    "status" "FeeStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FeesRecords_pkey" PRIMARY KEY ("id")
);
