-- CreateEnum
CREATE TYPE "Color" AS ENUM ('BROWN', 'LIGHTBLUE', 'PINK', 'ORANGE', 'RED', 'YELLOW', 'GREEN', 'BLUE');

-- CreateEnum
CREATE TYPE "Cardtype" AS ENUM ('CHANCE', 'COMMUNITYCHEST');

-- CreateTable
CREATE TABLE "Property" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "color" "Color" NOT NULL,
    "price" INTEGER NOT NULL,
    "rent" INTEGER[],

    CONSTRAINT "Property_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Houses" (
    "color" "Color" NOT NULL,
    "price" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Railroad" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "rent" INTEGER[],

    CONSTRAINT "Railroad_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Utilities" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "rent" INTEGER[],

    CONSTRAINT "Utilities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Special" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Special_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Drawable" (
    "id" INTEGER NOT NULL,
    "type" "Cardtype" NOT NULL,

    CONSTRAINT "Drawable_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Card" (
    "id" SERIAL NOT NULL,
    "type" "Cardtype" NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Card_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Property_id_key" ON "Property"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Property_name_key" ON "Property"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Houses_color_key" ON "Houses"("color");

-- CreateIndex
CREATE UNIQUE INDEX "Railroad_id_key" ON "Railroad"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Railroad_name_key" ON "Railroad"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Utilities_id_key" ON "Utilities"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Utilities_name_key" ON "Utilities"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Special_id_key" ON "Special"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Special_name_key" ON "Special"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Drawable_id_key" ON "Drawable"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Card_description_key" ON "Card"("description");
