import { prisma } from "../../util/db"
import { z } from "zod"
import { auth } from "../../util/lucia"
import { GameRoute, gameSchema } from "../../util/cleaning"

export default defineEventHandler(async (event) => {
  const gameResult = gameSchema.safeParse(await readBody(event))

  if (!gameResult.success) {
    throw createError({
      status: 404,
      statusMessage: gameResult.error.message
    })
  }

  const authRequest = auth.handleRequest(event)
  const session = await authRequest.validate()


  if (!session) throw createError({
    status: 401,
    statusMessage: "User is not Authenticated"
  })

  const gameID = getRouterParam(event, 'id')

  const result = z.coerce.number().safeParse(gameID)

  if (!result.success) throw createError({
    status: 404,
    statusMessage: "Failed to parse route"
  })

  // XXX: Tear this garbage up when prisma gets replaced
  const dbResult = await prisma.game.update({
    where: {
      username: session.user.username,
      id: result.data
    },
    data: {
      data: gameResult.data
    },
    select: {
      id: true,
    }
  })

  if (!dbResult) throw createError({
    status: 500,
    statusMessage: "Did not find Resource"
  })

  return dbResult

})
