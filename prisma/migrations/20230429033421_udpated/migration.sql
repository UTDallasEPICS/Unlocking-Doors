/*
  Warnings:

  - You are about to drop the column `permissions` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Tag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ContactToTag` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `company` to the `Contact` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Permission" AS ENUM ('ADMIN', 'EDITOR', 'VIEWER');

-- DropForeignKey
ALTER TABLE "_ContactToTag" DROP CONSTRAINT "_ContactToTag_A_fkey";

-- DropForeignKey
ALTER TABLE "_ContactToTag" DROP CONSTRAINT "_ContactToTag_B_fkey";

-- AlterTable
ALTER TABLE "Contact" ADD COLUMN     "company" TEXT NOT NULL,
ADD COLUMN     "group" TEXT[],
ADD COLUMN     "tag" TEXT[];

-- AlterTable
ALTER TABLE "User" DROP COLUMN "permissions",
ADD COLUMN     "permission" "Permission" NOT NULL DEFAULT 'VIEWER';

-- DropTable
DROP TABLE "Tag";

-- DropTable
DROP TABLE "_ContactToTag";
