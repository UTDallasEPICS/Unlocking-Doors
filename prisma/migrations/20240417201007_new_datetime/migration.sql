/*
  Warnings:

  - Made the column `added_date` on table `Contact` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Contact" ALTER COLUMN "added_date" SET NOT NULL,
ALTER COLUMN "added_date" SET DEFAULT CURRENT_TIMESTAMP;
