import { Spot } from "@/util/helpers";
import { prisma } from "../util/db";

function sorter(a: Spot, b: Spot) {
  if (a.id > b.id) return 1;
  else if (b.id > a.id) return -1;
  else return 0;
}

export default defineEventHandler(async () => {
  const spots = await Promise.all([
    prisma.property.findMany(),
    prisma.railroad.findMany(),
    prisma.utilities.findMany(),
    prisma.special.findMany(),
    prisma.drawable.findMany(),
  ])
    .then((res) => res.flat().sort((a, b) => sorter(a, b)))
    .catch(() => { console.log('fuck'); return null });

  // const properties = await prisma.property.findMany()
  // const railroads = await prisma.railroad.findMany()
  // const utilities = await prisma.utilities.findMany()
  // const special = await prisma.special.findMany()
  // const drawables = await prisma.special.findMany()
  //
  //
  // const spots = [...properties, ...railroads, ...utilities, ...special, ...drawables]
  //   .sort((a, b) => {
  //     if (a.id > b.id) return 1
  //     if (b.id > a.id) return -1
  //     return 0
  //   })
  if (!spots)
    throw createError({
      statusCode: 404,
      statusMessage: "Failed to Query the Proper Spots",
    });

  return spots;
});
