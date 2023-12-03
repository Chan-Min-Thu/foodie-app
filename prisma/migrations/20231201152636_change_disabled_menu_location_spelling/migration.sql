/*
  Warnings:

  - You are about to drop the `DisabledMenuLoction` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `assetUrl` to the `Table` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "DisabledMenuLoction" DROP CONSTRAINT "DisabledMenuLoction_locationId_fkey";

-- DropForeignKey
ALTER TABLE "DisabledMenuLoction" DROP CONSTRAINT "DisabledMenuLoction_menuId_fkey";

-- AlterTable
ALTER TABLE "Table" ADD COLUMN     "assetUrl" TEXT NOT NULL;

-- DropTable
DROP TABLE "DisabledMenuLoction";

-- CreateTable
CREATE TABLE "DisabledMenuLocation" (
    "id" SERIAL NOT NULL,
    "menuId" INTEGER NOT NULL,
    "locationId" INTEGER NOT NULL,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DisabledMenuLocation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DisabledMenuLocation" ADD CONSTRAINT "DisabledMenuLocation_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES "Menu"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DisabledMenuLocation" ADD CONSTRAINT "DisabledMenuLocation_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
