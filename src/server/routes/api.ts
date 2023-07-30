import e from "express";
import { cardIDScheama, colorSchema, idSchema } from "../schema";
import prisma from '../dbclient'
import { CardCache, ColorCache, IDCache, SpotCache } from "../cache";

const apiRouter = e.Router()

const singularGrabRoute = /\/api\/:type(property|railroard|utility)\/:property/

apiRouter.get(singularGrabRoute, async (req, res) => {
  const { type, property } = req.params

  let result

  if (type === 'property') {
    result = await prisma.property.findFirst({
      where: {
        name: {
          contains: property
        }
      }
    })
  } else if (type === 'railroad') {
    result = await prisma.railroad.findFirst({
      where: {
        name: {
          contains: property
        }
      }
    })
  } else if (type === 'utility') {
    result = await prisma.utilities.findFirst({
      where: {
        name: {
          contains: property
        }
      }
    })
  }

  if (!result) {
    return res.sendStatus(404)
  }

  return res.status(200).json(result)
})

apiRouter.get('/api/color/:color', async (req, res) => {
  const result = colorSchema.safeParse(req.params.color)

  if (!result.success) {
    return res.sendStatus(401)
  }

  const color = result.data

  let out = ColorCache.get(color)
  let data
  if (!out) {
    data = await prisma.property.findMany({
      where: {
        color: color
      }
    })
    if (data) ColorCache.set(color, data)
  } else {
    data = out
  }
  if (!data) return res.sendStatus(404)
  res.status(200).json(data)
})

apiRouter.get('/api/spot/:id', async (req, res) => {
  const result = idSchema.safeParse(req.params.id)

  if (!result.success) {
    return res.sendStatus(401)
  }

  const id = result.data
  const out = IDCache.get(id)
  let data
  if (!out) {
    // TODO: Set these array to semantic constants
    if ([0, 4, 10, 20, 30, 38].includes(id)) {
      data = await prisma.special.findUnique({
        where: { id: id, }
      })
    } else if ([12, 28].includes(id)) {
      data = await prisma.utilities.findUnique({
        where: { id: id, }
      })
    } else if ([5, 15, 25, 35].includes(id)) {
      data = await prisma.railroad.findUnique({
        where: { id: id, }
      })
    } else if ([2, 7, 17, 22, 33, 36].includes(id)) {
      data = await prisma.drawable.findUnique({
        where: { id: id, }
      })
    } else {
      data = await prisma.property.findUnique({
        where: { id: id, }
      })
    }
    if (data) IDCache.set(id, data)
  } else {
    data = out
  }

  if (!data) {
    return res.status(500).json(null)
  }
  res.status(200).json(data)
})

apiRouter.get('/api/spots', async (req, res) => {
  let spots
  if (!SpotCache.get(0)) {
    const properties = await prisma.property.findMany()
    const railroads = await prisma.railroad.findMany()
    const utilities = await prisma.utilities.findMany()
    const special = await prisma.special.findMany()
    const drawables = await prisma.special.findMany()


    spots = [...properties, ...railroads, ...utilities, ...special, ...drawables]
      .sort((a, b) => {
        if (a.id > b.id) return 1
        if (b.id > a.id) return -1
        return 0
      })
    res.status(200).json(spots)
    SpotCache.set(0, spots)
  } else {
    spots = SpotCache.get(0)
    res.status(200).json(spots)
  }
})

apiRouter.get('/api/cards', async (req, res) => {
  try {
    let cards
    if (CardCache.size != 33) {
      cards = await prisma.card.findMany()
      res.status(200).json(cards)
      for (let i = 0; i < cards.length; i++) {
        CardCache.set(i, cards[i])
      }
    } else {
      cards = Array.from(CardCache.values())
      res.status(200).json(cards)
    }
  } catch {
    res.status(500).json(null)
  }
})

apiRouter.get('/api/card/:id', async (req, res) => {
  try {
    let card
    const id = cardIDScheama.parse(req.params.id)
    if (!CardCache.get(id)) {
      card = await prisma.card.findFirst({
        where: {
          id: id
        }
      })
      if (card) CardCache.set(id, card)
      res.status(200).json(card)
    } else {
      card = CardCache.get(id)
      res.status(200).json(card)
    }
  } catch {
    res.status(500).json(null)
  }
})

export default apiRouter
