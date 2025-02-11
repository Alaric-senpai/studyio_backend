-- CreateEnum
CREATE TYPE "error" AS ENUM ('REPORTED', 'RESOLVED');

-- CreateTable
CREATE TABLE "Developer" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Developer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Errors" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "status" "error" NOT NULL,
    "description" TEXT,
    "ErrorMsg" TEXT NOT NULL,
    "ReportedBy" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Errors_pkey" PRIMARY KEY ("id")
);
