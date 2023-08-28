import { prisma } from "@/server/util/db";

export default defineEventHandler(async () => {
  const spots = await prisma.$transaction([
    prisma.property.findMany(),
    prisma.railroad.findMany(),
    prisma.utilities.findMany(),
    prisma.special.findMany(),
    prisma.drawable.findMany(),
  ])
    .then(res => res.flat().sort((a, b) => a.id - b.id))

  if (!spots)
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to Query the Proper Spots",
    });

  return spots;
});
