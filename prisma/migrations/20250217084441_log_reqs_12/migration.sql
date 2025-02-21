/*
  Warnings:

  - Added the required column `responseTime` to the `RequestLog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `statusCode` to the `RequestLog` table without a default value. This is not possible if the table is not empty.
  - Made the column `host` on table `RequestLog` required. This step will fail if there are existing NULL values in that column.
  - Made the column `ip` on table `RequestLog` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "RequestLog" ADD COLUMN     "responseTime" INTEGER NOT NULL,
ADD COLUMN     "statusCode" INTEGER NOT NULL,
ALTER COLUMN "host" SET NOT NULL,
ALTER COLUMN "ip" SET NOT NULL;
