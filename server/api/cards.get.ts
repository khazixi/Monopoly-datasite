import { getCards } from "../util/db";

export default defineEventHandler(async () => {
  const cards = await getCards()

  if (!cards.length)
    throw createError({
      status: 404,
      message: "Unable to find Cards",
    });

  return cards;
});
