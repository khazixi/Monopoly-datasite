-- CreateTable
CREATE TABLE "Drawable" (
    "id" INTEGER NOT NULL,
    "type" "Cardtype" NOT NULL,

    CONSTRAINT "Drawable_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Drawable_id_key" ON "Drawable"("id");
