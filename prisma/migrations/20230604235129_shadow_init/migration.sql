/*
  Warnings:

  - Added the required column `price` to the `Utilities` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Utilities" ADD COLUMN     "price" INTEGER NOT NULL;
