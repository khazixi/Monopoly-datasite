DO $$ BEGIN
 CREATE TYPE "Cardtype" AS ENUM('CHANCE', 'COMMUNITYCHEST');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "Color" AS ENUM('BROWN', 'LIGHTBLUE', 'PINK', 'ORANGE', 'RED', 'YELLOW', 'GREEN', 'BLUE');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DROP TABLE "Utilities";
DROP TABLE "Railroad";

CREATE TABLE IF NOT EXISTS "Card" (
	"id" serial PRIMARY KEY NOT NULL,
	"type" "Cardtype" NOT NULL,
	"description" text NOT NULL,
	CONSTRAINT "Card_description_unique" UNIQUE("description")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Drawable" (
	"id" serial NOT NULL,
	"type" "Cardtype" NOT NULL,
	CONSTRAINT "Drawable_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Game" (
	"id" serial PRIMARY KEY NOT NULL,
	"data" json NOT NULL,
	"username" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Houses" (
	"color" "Color" NOT NULL,
	"price" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Key" (
	"id" text PRIMARY KEY NOT NULL,
	"hashed_password" text,
	"user_id" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Property" (
	"id" serial NOT NULL,
	"name" text NOT NULL,
	"price" integer NOT NULL,
	"rent" integer[] NOT NULL,
	"color" "Color",
	CONSTRAINT "Property_id_unique" UNIQUE("id"),
	CONSTRAINT "Property_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Session" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"active_expires" bigint NOT NULL,
	"idle_expires" bigint NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Special" (
	"id" serial NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	CONSTRAINT "Special_id_unique" UNIQUE("id"),
	CONSTRAINT "Special_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "User" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" text NOT NULL
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "username_idx" ON "Game" ("username");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_id_idx" ON "Key" ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_id_idx" ON "Session" ("user_id");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Key" ADD CONSTRAINT "Key_user_id_User_id_fk" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Session" ADD CONSTRAINT "Session_user_id_User_id_fk" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
