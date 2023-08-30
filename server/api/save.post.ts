import { gameSchema } from "../util/cleaning";
import { saveGame } from "../util/db";
import { auth } from "../util/lucia";

export default defineEventHandler(async (event) => {
  const result = gameSchema.safeParse(await readBody(event))

  if (!result.success) {
    throw createError({
      status: 400,
      statusMessage: result.error.message
    })
  }

  const { data: game } = result

  const authRequest = auth.handleRequest(event)
  const session = await authRequest.validate()
  if (!session) {
    throw createError({
      status: 401,
      statusMessage: "Invalid Session"
    })
  }

  const dbResult = await saveGame(session.user.username, game)
  .then(() => true)
  .catch(() => false)

  if (!dbResult) {
    throw createError({
      status: 500,
      statusMessage: "Failed to save Games"
    })
  }

  return dbResult
})
