import { getSpots } from "@/server/util/db";

export default defineEventHandler(async () => {
  const spots = await getSpots()

  if (spots.some(v => !v))
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to Query the Proper Spots",
    });

  return spots;
});
