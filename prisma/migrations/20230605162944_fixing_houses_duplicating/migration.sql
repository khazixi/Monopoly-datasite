/*
  Warnings:

  - The primary key for the `Houses` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Houses` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[color]` on the table `Houses` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Houses" DROP CONSTRAINT "Houses_pkey",
DROP COLUMN "id";

-- CreateIndex
CREATE UNIQUE INDEX "Houses_color_key" ON "Houses"("color");
