import { PrismaClient } from "@prisma/client"

async function clearGames() {
  const prisma = new PrismaClient()

  const a = await prisma.game.deleteMany({})
}

clearGames()
