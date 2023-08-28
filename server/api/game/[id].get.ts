import { z } from "zod";
import { gameRoute } from "../../util/cleaning";
import { prisma } from "../../util/db";
import { auth } from "../../util/lucia";

export default defineEventHandler(async (event) => {
  const authRequest = auth.handleRequest(event)
  const session = await authRequest.validate()

  if (!session) throw createError({
    status: 401,
    statusMessage: "User is not Authenticated"
  })

  const gameID = getRouterParam(event, 'id')

  const result = z.coerce.number().safeParse(gameID)

  if (!result.success) throw createError({
    status: 400,
    statusMessage: "Improper Game ID Provided"
  })

  const game = await prisma.game.findUnique({
    where: {
      username: session.user.username,
      id: result.data
    },
    select: {
      id: true,
      data: true,
    }
  })

  const gameResult = gameRoute.safeParse(game)

  if (!gameResult.success) throw createError({
    status: 500,
    statusMessage: "Unable to find game",
  })

  return gameResult.data
})
