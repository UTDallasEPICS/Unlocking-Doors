/*
  Warnings:

  - You are about to drop the column `address` on the `contact` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `contact` table. All the data in the column will be lost.
  - You are about to drop the column `company` on the `contact` table. All the data in the column will be lost.
  - You are about to drop the column `country` on the `contact` table. All the data in the column will be lost.
  - You are about to drop the column `directPhone` on the `contact` table. All the data in the column will be lost.
  - You are about to drop the column `emailAddress` on the `contact` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `contact` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `contact` table. All the data in the column will be lost.
  - You are about to drop the column `mainPhone` on the `contact` table. All the data in the column will be lost.
  - You are about to drop the column `mobilePhone` on the `contact` table. All the data in the column will be lost.
  - You are about to drop the column `narrative` on the `contact` table. All the data in the column will be lost.
  - You are about to drop the column `prefix` on the `contact` table. All the data in the column will be lost.
  - You are about to drop the column `professionalTitle` on the `contact` table. All the data in the column will be lost.
  - You are about to drop the column `salutation` on the `contact` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `contact` table. All the data in the column will be lost.
  - You are about to drop the column `suffix` on the `contact` table. All the data in the column will be lost.
  - You are about to drop the column `zipCode` on the `contact` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `contact` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `contact` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "contact" DROP COLUMN "address",
DROP COLUMN "city",
DROP COLUMN "company",
DROP COLUMN "country",
DROP COLUMN "directPhone",
DROP COLUMN "emailAddress",
DROP COLUMN "firstName",
DROP COLUMN "lastName",
DROP COLUMN "mainPhone",
DROP COLUMN "mobilePhone",
DROP COLUMN "narrative",
DROP COLUMN "prefix",
DROP COLUMN "professionalTitle",
DROP COLUMN "salutation",
DROP COLUMN "state",
DROP COLUMN "suffix",
DROP COLUMN "zipCode",
ADD COLUMN     "name" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Contact" (
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

    CONSTRAINT "Contact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ContactToTag" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ContactToTag_AB_unique" ON "_ContactToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_ContactToTag_B_index" ON "_ContactToTag"("B");

-- CreateIndex
CREATE UNIQUE INDEX "contact_name_key" ON "contact"("name");

-- AddForeignKey
ALTER TABLE "_ContactToTag" ADD CONSTRAINT "_ContactToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Contact"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ContactToTag" ADD CONSTRAINT "_ContactToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "contact"("id") ON DELETE CASCADE ON UPDATE CASCADE;
