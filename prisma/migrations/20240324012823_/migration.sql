/*
  Warnings:

  - You are about to drop the column `address` on the `Contact` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `Contact` table. All the data in the column will be lost.
  - You are about to drop the column `country` on the `Contact` table. All the data in the column will be lost.
  - You are about to drop the column `salutation` on the `Contact` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `Contact` table. All the data in the column will be lost.
  - You are about to drop the column `zipCode` on the `Contact` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Contact" DROP COLUMN "address",
DROP COLUMN "city",
DROP COLUMN "country",
DROP COLUMN "salutation",
DROP COLUMN "state",
DROP COLUMN "zipCode",
ADD COLUMN     "added_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "address1" TEXT,
ADD COLUMN     "address1Type" TEXT,
ADD COLUMN     "address2" TEXT,
ADD COLUMN     "address2Type" TEXT,
ADD COLUMN     "city1" TEXT,
ADD COLUMN     "city2" TEXT,
ADD COLUMN     "middleName" TEXT,
ADD COLUMN     "removed" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "state1" TEXT,
ADD COLUMN     "state2" TEXT,
ADD COLUMN     "zipCode1" TEXT,
ADD COLUMN     "zipCode2" TEXT;
