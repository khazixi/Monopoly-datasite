import { gameRoute } from "../util/cleaning";
import { getGames } from "../util/db";
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

  const games = await getGames(session.user.username)

  // NOTE: I am using zod to verify db json values
  const result = gameRoute.array().safeParse(games)

  if (!result.success) throw createError({
    status: 500,
    message: result.error.message
  })

  return result.data
})
