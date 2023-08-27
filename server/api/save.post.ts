import { gameSchema } from "../util/cleaning";
import { prisma } from "../util/db";
import { auth } from "../util/lucia";

export default defineEventHandler(async (event) => {
  const result = gameSchema.safeParse(await readBody(event))

  if (!result.success) {
    throw createError({
      status: 404,
      statusMessage: result.error.message
    })
  }

  const { data: game } = result

  const authRequest = auth.handleRequest(event)
  const session = await authRequest.validate()
  if (!session) {
    throw createError({
      status: 404,
      statusMessage: "Invalid Session"
    })
  }

  const dbResult = await prisma.game.create({
    select: {
      id: true,
    },
    data: {
      username: session.user.username,
      data: game,
    }
  })

  if (!dbResult) {
    throw createError({
      status: 404,
      statusMessage: "Failed to Create Games"
    })
  }

  return dbResult
})
