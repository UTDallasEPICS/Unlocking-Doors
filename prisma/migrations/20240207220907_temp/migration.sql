/*
  Warnings:

  - You are about to drop the column `address1` on the `Contact` table. All the data in the column will be lost.
  - You are about to drop the column `address1Type` on the `Contact` table. All the data in the column will be lost.
  - You are about to drop the column `address2` on the `Contact` table. All the data in the column will be lost.
  - You are about to drop the column `address2Type` on the `Contact` table. All the data in the column will be lost.
  - You are about to drop the column `city1` on the `Contact` table. All the data in the column will be lost.
  - You are about to drop the column `city2` on the `Contact` table. All the data in the column will be lost.
  - You are about to drop the column `middleName` on the `Contact` table. All the data in the column will be lost.
  - You are about to drop the column `state1` on the `Contact` table. All the data in the column will be lost.
  - You are about to drop the column `state2` on the `Contact` table. All the data in the column will be lost.
  - You are about to drop the column `zipCode1` on the `Contact` table. All the data in the column will be lost.
  - You are about to drop the column `zipCode2` on the `Contact` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Contact" DROP COLUMN "address1",
DROP COLUMN "address1Type",
DROP COLUMN "address2",
DROP COLUMN "address2Type",
DROP COLUMN "city1",
DROP COLUMN "city2",
DROP COLUMN "middleName",
DROP COLUMN "state1",
DROP COLUMN "state2",
DROP COLUMN "zipCode1",
DROP COLUMN "zipCode2",
ADD COLUMN     "address" TEXT,
ADD COLUMN     "city" TEXT,
ADD COLUMN     "country" TEXT,
ADD COLUMN     "salutation" TEXT,
ADD COLUMN     "state" TEXT,
ADD COLUMN     "zipCode" TEXT;
