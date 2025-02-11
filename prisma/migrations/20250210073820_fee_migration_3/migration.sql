/*
  Warnings:

  - The values [PAID] on the enum `FeeStatus` will be removed. If these variants are still used in the database, this will fail.
  - Made the column `balance` on table `FeesRecords` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "FeeStatus_new" AS ENUM ('FULLYPAID', 'PENDING');
ALTER TABLE "FeesRecords" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "FeesRecords" ALTER COLUMN "status" TYPE "FeeStatus_new" USING ("status"::text::"FeeStatus_new");
ALTER TYPE "FeeStatus" RENAME TO "FeeStatus_old";
ALTER TYPE "FeeStatus_new" RENAME TO "FeeStatus";
DROP TYPE "FeeStatus_old";
ALTER TABLE "FeesRecords" ALTER COLUMN "status" SET DEFAULT 'PENDING';
COMMIT;

-- AlterTable
ALTER TABLE "FeesRecords" ADD COLUMN     "overpay" DOUBLE PRECISION DEFAULT 0.00,
ALTER COLUMN "balance" SET NOT NULL;

-- CreateTable
CREATE TABLE "Accounting" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "Accounting_pkey" PRIMARY KEY ("id")
);
