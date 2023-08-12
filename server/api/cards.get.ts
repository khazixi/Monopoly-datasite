import { prisma } from "../util/db";

export default defineEventHandler(async () => {
  const cards = await prisma.card.findMany();

  if (!cards)
    throw createError({
      status: 404,
      message: "Unable to find Cards",
    });

  return cards;
});
