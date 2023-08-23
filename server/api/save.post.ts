import { LuciaError } from "lucia";
import { z } from "zod";
import { prisma } from "../util/db";
import { auth } from "../util/lucia";

const gameSchema = z.object({
  name: z.string(),
  players: z.object({
    money: z.number(),
    name: z.string(),
    owned: z.object({
      name: z.string(),
      houses: z.number().optional(),
      position: z.number()
    }).array()
  }).array()
})

type Game = z.infer<typeof gameSchema>

function gameToPrisma(game: Game, username: string) {
  return {
    name: game.name,
    username: username,
    players: {
      create: game.players.map(v => {
        return {
          name: v.name,
          money: v.money,
          create: v.owned.map(p => {
            return { name: p.name, houses: p.houses, position: p.position }
          })
        }
      })
    }

  }
}

export default defineEventHandler(async (event) => {
  const result = gameSchema.safeParse(readBody(event))
  if (!result.success) {
    throw createError({
      status: 404,
      statusMessage: result.error.message
    })
  }
  const { data: game } = result
  const authRequest = auth.handleRequest(event)
  try {
    const session = await authRequest.validate()
    if (!session) {
      return createError({
        status: 404,
        statusMessage: "Invalid Session"
      })
    }
    const dbResult = await prisma.game.create({
      data: gameToPrisma(game, session.user.username)
    })

    if (!dbResult) {
      return createError({
        status: 404,
        statusMessage: "Failed to Create Games"
      })
    }
  } catch (e) {
    if (e instanceof LuciaError) {
      throw createError({
        status: 404,
        statusMessage: e.message
      })
    }
  }
})
