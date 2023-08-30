ALTER TYPE "Color" ADD VALUE 'NONE';--> statement-breakpoint
ALTER TABLE "Property" ALTER COLUMN "color" SET NOT NULL;