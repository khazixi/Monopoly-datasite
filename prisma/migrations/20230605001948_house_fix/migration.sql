-- AlterTable
ALTER TABLE "Houses" ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Houses_pkey" PRIMARY KEY ("id");
