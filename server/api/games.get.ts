import { LuciaError } from "lucia";
import { prisma } from "../util/db";
import { auth } from "../util/lucia";

export default defineEventHandler(async (event) => {
  const authRequest = auth.handleRequest(event)
  try {
    const session = await authRequest.validate()
    if (!session) {
      return createError({
        status: 404,
        statusMessage: "Invalid Session"
      })
    }
    const games = await prisma.game.findMany({
      where: {
        username: session.user.username
      },
      select: {
        name: true,
        players: {
          select: {
            name: true,
            money: true,
            owned: {
              select: {
                name: true,
                houses: true,
                position: true,
              },
            },
          }
        }

      }
    })

    return games
  } catch (e) {
    if (e instanceof LuciaError) {
      throw createError({
        status: 404,
        statusMessage: e.message
      })
    }
  }
})
