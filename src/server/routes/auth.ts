import e from "express";
import { z } from "zod";
import prisma from "../dbclient";
import { auth } from "../lucia";
import { gameSchema, userCreationSchema } from "../schema";

const authRouter = e.Router()

const signinRoutes = /\/(signup|login)/

type ResponseGame = z.infer<typeof gameSchema>

function gameCleaner(game: ResponseGame) {
  let players = game.players.map(
    player => {
      return {
        name: player.name,
        create: {
          owned: player.owned
        }
      }
    }
  )

  return {
    name: game.name,
    username: game.username,
    players: {
      create: players
    }
  }

}

authRouter.put('/save', async (req, res) => {
  // TODO: Add Auth to secure writes
  const authRequest = auth.handleRequest(req, res)
  const session = await authRequest.validate()
  if (!session) {
    return res.sendStatus(401)
  }
  authRequest.setSession(session)

  const result = gameSchema.safeParse(req.body)
  if (!result.success) {
    return res.status(404).send(result.error.message)
  }

  const gameCreationResult = await prisma.game.create({
    data: gameCleaner(result.data)
  })

  if (!gameCreationResult) {
    return res.status(404).send("Game was unable to save")
  }

  return res.send(200)
})

authRouter.patch('/save', async (req, res) => {
  const authRequest = auth.handleRequest(req, res)
  const session = await authRequest.validate()
  if (!session) {
    return res.sendStatus(401)
  }

  const result = gameSchema.safeParse(req.body)
  if (!result.success) {
    return res.status(404).send(result.error.message)
  }

  const gameCreationResult = await prisma.game.update({
    where: {
      name: result.data.name,
      username: result.data.username,
    },
    data: gameCleaner(result.data)
  })
  if (!gameCreationResult) {
    return res.status(404).send("Game was unable to save")
  }

  return res.send(200)
})

authRouter.get('/game/games', async (req, res) => {
  const authRequest = auth.handleRequest(req, res)
  const session = await authRequest.validate()
  if (!session) {
    return res.sendStatus(401)
  }

  const games = await prisma.game.findMany({
    where: {
      username: session.user.username
    },
    select: {
      name: true
    }
  })

  if (!games) {
    return res.status(404).send("Unable to find any games with the associated username")
  }

  return res.status(200).json(games)
})

authRouter.get('/game/:username/:name', async (req, res) => {
  const authRequest = auth.handleRequest(req, res)
  const session = await authRequest.validate()
  if (!session) {
    return res.sendStatus(401)
  }

  const game = await prisma.game.findFirst({
    where: {
      name: req.params.name,
      username: req.params.username
    },
    include: {
      players: {
        include: {
          owned: true
        }
      }
    }
  })

  if (!game) {
    return res.status(404).send("Unable to find any game with the associated username")
  }

  return res.status(200).json(game)
})

authRouter.delete('/game/:username/:name', async (req, res) => {
  const authRequest = auth.handleRequest(req, res)
  const session = await authRequest.validate()
  if (!session) {
    return res.sendStatus(401)
  }

  const deletedGame = await prisma.game.delete({
    where: {
      name: req.params.name,
      username: req.params.username
    },
    include: {
      players: {
        include: {
          owned: true
        }
      }
    }
  })

  if (!deletedGame) {
    return res.status(404).send("Unable to delete any game with the associated username")
  }

  return res.status(200).json(deletedGame)
})

authRouter.post('/signup', async (req, res) => {
  const result = userCreationSchema.safeParse(req.body)
  if (!result.success) {
    return res.status(404).send(result.error.message)
  }

  const { username, password } = result.data

  try {
    const user = await auth.createUser({
      key: {
        providerId: 'username',
        providerUserId: username.toLowerCase(),
        password,
      },
      attributes: {
        username
      }
    })

    const session = await auth.createSession({
      userId: user.userId,
      attributes: {}
    })

    const authRequest = auth.handleRequest(req, res)

    authRequest.setSession(session)
  } catch (e) {
    if (e instanceof Error) {
      return res.status(400).send(e.message)
    }
  }
})

authRouter.post('/login', async (req, res) => {
  const result = userCreationSchema.safeParse(req.body)
  if (!result.success) {
    return res.status(404).send(result.error.message)
  }

  const { username, password } = result.data

  try {
    const user = await auth.useKey('username', username.toLowerCase(), password)
    const session = await auth.createSession({
      userId: user.userId,
      attributes: {},
    })
    const authRequest = auth.handleRequest(req, res)
    authRequest.setSession(session)
  } catch (e) {
    if (e instanceof Error) {
      return res.status(400).send(e.message)
    }
  }
})

authRouter.post('/logout', async (req, res) => {
  const authRequest = auth.handleRequest(req, res)
  const session = await authRequest.validate()
  if (!session) {
    return res.sendStatus(401)
  }

  await auth.invalidateSession(session.sessionId)
  await auth.deleteDeadUserSessions(session.user.userId)
  authRequest.setSession(null)
})

// TODO: Implement Auth Logic using Lucia

export default authRouter
