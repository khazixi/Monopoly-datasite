import { prisma, updateGame } from "../../util/db"
import { z } from "zod"
import { auth } from "../../util/lucia"
import { GameRoute, gameSchema } from "../../util/cleaning"

export default defineEventHandler(async (event) => {
  const gameResult = gameSchema.safeParse(await readBody(event))

  if (!gameResult.success) {
    throw createError({
      status: 400,
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
    status: 400,
    statusMessage: "Failed to parse route"
  })

  const dbResult = await updateGame(session.user.username, {
    id: result.data,
    data: gameResult.data,
  })
    .then(() => true)
    .catch(() => false)

  if (!dbResult) throw createError({
    status: 500,
    statusMessage: "Did not find Resource"
  })

  return dbResult
})
