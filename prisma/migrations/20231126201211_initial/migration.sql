-- CreateEnum
CREATE TYPE "Permission" AS ENUM ('ADMIN', 'EDITOR', 'VIEWER');

-- CreateTable
CREATE TABLE "contact" (
    "id" SERIAL NOT NULL,
    "company" TEXT NOT NULL,
    "prefix" TEXT,
    "firstName" TEXT,
    "lastName" TEXT,
    "suffix" TEXT,
    "salutation" TEXT,
    "professionalTitle" TEXT,
    "address" TEXT,
    "city" TEXT,
    "state" TEXT,
    "zipCode" TEXT,
    "country" TEXT,
    "mainPhone" TEXT,
    "directPhone" TEXT,
    "mobilePhone" TEXT,
    "emailAddress" TEXT,
    "narrative" TEXT,
    "group" TEXT[],
    "tag" TEXT[],

    CONSTRAINT "contact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "permission" "Permission" NOT NULL DEFAULT 'VIEWER',

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");
