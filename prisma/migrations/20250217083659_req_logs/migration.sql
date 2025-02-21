/*
  Warnings:

  - You are about to drop the column `docType` on the `DocumentUpload` table. All the data in the column will be lost.
  - Added the required column `MimeType` to the `DocumentUpload` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DocumentUpload" DROP COLUMN "docType",
ADD COLUMN     "MimeType" TEXT NOT NULL,
ALTER COLUMN "storageProvider" SET DEFAULT 'local';

-- CreateTable
CREATE TABLE "RequestLog" (
    "id" SERIAL NOT NULL,
    "method" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "host" TEXT NOT NULL,
    "ip" TEXT NOT NULL,
    "userAgent" TEXT,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RequestLog_pkey" PRIMARY KEY ("id")
);
