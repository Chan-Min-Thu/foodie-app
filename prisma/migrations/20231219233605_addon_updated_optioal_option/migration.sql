-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_addOnId_fkey";

-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "addOnId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_addOnId_fkey" FOREIGN KEY ("addOnId") REFERENCES "AddOn"("id") ON DELETE SET NULL ON UPDATE CASCADE;
