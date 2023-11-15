/*
  Warnings:

  - You are about to drop the `CompanyMenuCategory` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `name` to the `Location` table without a default value. This is not possible if the table is not empty.
  - Added the required column `companyId` to the `MenuCategory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `companyId` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CompanyMenuCategory" DROP CONSTRAINT "CompanyMenuCategory_companyId_fkey";

-- DropForeignKey
ALTER TABLE "CompanyMenuCategory" DROP CONSTRAINT "CompanyMenuCategory_menuCategoryId_fkey";

-- AlterTable
ALTER TABLE "AddOn" ALTER COLUMN "isArchived" SET DEFAULT false;

-- AlterTable
ALTER TABLE "AddOnCategory" ALTER COLUMN "isArchived" SET DEFAULT false;

-- AlterTable
ALTER TABLE "AddOnCategoryMenu" ALTER COLUMN "isArchived" SET DEFAULT false;

-- AlterTable
ALTER TABLE "Company" ALTER COLUMN "isArchived" SET DEFAULT false;

-- AlterTable
ALTER TABLE "DisabledMenuCategoryLocation" ALTER COLUMN "isArchived" SET DEFAULT false;

-- AlterTable
ALTER TABLE "DisabledMenuLoction" ALTER COLUMN "isArchived" SET DEFAULT false;

-- AlterTable
ALTER TABLE "Location" ADD COLUMN     "name" TEXT NOT NULL,
ALTER COLUMN "isArchived" SET DEFAULT false;

-- AlterTable
ALTER TABLE "Menu" ALTER COLUMN "isArchived" SET DEFAULT false;

-- AlterTable
ALTER TABLE "MenuCategory" ADD COLUMN     "companyId" INTEGER NOT NULL,
ALTER COLUMN "isArchived" SET DEFAULT false;

-- AlterTable
ALTER TABLE "MenuCategoryMenu" ALTER COLUMN "isArchived" SET DEFAULT false;

-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "isArchived" SET DEFAULT false;

-- AlterTable
ALTER TABLE "OrderLine" ALTER COLUMN "isArchived" SET DEFAULT false;

-- AlterTable
ALTER TABLE "Table" ALTER COLUMN "isArchived" SET DEFAULT false;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "companyId" INTEGER NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "isArchived" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "CompanyMenuCategory";

-- AddForeignKey
ALTER TABLE "MenuCategory" ADD CONSTRAINT "MenuCategory_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
