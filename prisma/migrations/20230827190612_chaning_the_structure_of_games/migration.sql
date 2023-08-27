/*
  Warnings:

  - You are about to drop the column `name` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the `Owned` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Player` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserData` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `data` to the `Game` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Game" DROP CONSTRAINT "Game_username_fkey";

-- DropForeignKey
ALTER TABLE "Owned" DROP CONSTRAINT "Owned_player_id_fkey";

-- DropForeignKey
ALTER TABLE "Player" DROP CONSTRAINT "Player_game_id_fkey";

-- DropIndex
DROP INDEX "Game_name_key";

-- AlterTable
ALTER TABLE "Game" DROP COLUMN "name",
ADD COLUMN     "data" JSONB NOT NULL;

-- DropTable
DROP TABLE "Owned";

-- DropTable
DROP TABLE "Player";

-- DropTable
DROP TABLE "UserData";
