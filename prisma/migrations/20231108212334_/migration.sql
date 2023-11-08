/*
  Warnings:

  - You are about to drop the `Contact` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Contact";

-- DropTable
DROP TABLE "User";

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
