import { gameRoute } from "../util/cleaning";
import { prisma } from "../util/db";
import { auth } from "../util/lucia";

export default defineEventHandler(async (event) => {
  const authRequest = auth.handleRequest(event)
  const session = await authRequest.validate()

  if (!session) {
    throw createError({
      status: 401,
      statusMessage: "Invalid Session"
    })
  }

  const games = await prisma.game.findMany({
    where: {
      username: session.user.username
    },
    select: {
      id: true,
      data: true,
    },
  })

  // NOTE: I am using zod to verify db json values
  const result = gameRoute.array().safeParse(games)

  if (!result.success) throw createError({
    status: 500,
    message: result.error.message
  })

  return result.data
})
