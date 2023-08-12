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

-- CreateTable
CREATE TABLE "Game" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Player" (
    "id" SERIAL NOT NULL,
    "game_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Owned" (
    "id" SERIAL NOT NULL,
    "player_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "houses" INTEGER,

    CONSTRAINT "Owned_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserData" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,

    CONSTRAINT "UserData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "active_expires" BIGINT NOT NULL,
    "idle_expires" BIGINT NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Key" (
    "id" TEXT NOT NULL,
    "hashed_password" TEXT,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "Key_pkey" PRIMARY KEY ("id")
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

-- CreateIndex
CREATE UNIQUE INDEX "Game_name_key" ON "Game"("name");

-- CreateIndex
CREATE INDEX "Game_username_idx" ON "Game"("username");

-- CreateIndex
CREATE INDEX "Player_game_id_idx" ON "Player"("game_id");

-- CreateIndex
CREATE INDEX "Owned_player_id_idx" ON "Owned"("player_id");

-- CreateIndex
CREATE UNIQUE INDEX "UserData_username_key" ON "UserData"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Session_id_key" ON "Session"("id");

-- CreateIndex
CREATE INDEX "Session_user_id_idx" ON "Session"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Key_id_key" ON "Key"("id");

-- CreateIndex
CREATE INDEX "Key_user_id_idx" ON "Key"("user_id");

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_username_fkey" FOREIGN KEY ("username") REFERENCES "UserData"("username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Owned" ADD CONSTRAINT "Owned_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Key" ADD CONSTRAINT "Key_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
