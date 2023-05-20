/*
  Warnings:

  - You are about to drop the column `name` on the `Card` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Card_name_key";

-- AlterTable
ALTER TABLE "Card" DROP COLUMN "name",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Card_pkey" PRIMARY KEY ("id");
