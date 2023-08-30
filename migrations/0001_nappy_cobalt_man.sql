-- ALTER TABLE "Game" RENAME COLUMN "string" TO "username";--> statement-breakpoint
-- ALTER TABLE "User" RENAME COLUMN "string" TO "username";--> statement-breakpoint
DROP TABLE "Card";
-- ALTER TABLE "Card" DROP CONSTRAINT "Card_description_unique";--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Card" (
	"id" serial PRIMARY KEY NOT NULL,
	"type" "Cardtype" NOT NULL,
	"description" text NOT NULL
);
DROP INDEX IF EXISTS "username_idx";--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "username_idx" ON "Game" ("username");
