import { z } from "zod";
import { Game, gameRoute } from "../../util/cleaning";
import { deleteGame } from "../../util/db";
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
    statusMessage: "No game ID Provided"
  })

  const out = await deleteGame(session.user.username, result.data)
    .then(() => ({ id: result.data }))
    .catch(() => null)

  return out
})
