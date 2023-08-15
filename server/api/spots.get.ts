import { prisma } from "../util/db";

export default defineEventHandler(async () => {
  const spots = await Promise.all([
    prisma.property.findMany(),
    prisma.railroad.findMany(),
    prisma.utilities.findMany(),
    prisma.special.findMany(),
    prisma.drawable.findMany(),
  ])
    .then(res => res.flat().sort((a, b) => a.id - b.id))
    .catch(() => { console.log('fuck'); return null });

  if (!spots)
    throw createError({
      statusCode: 404,
      statusMessage: "Failed to Query the Proper Spots",
    });

  return spots;
});
