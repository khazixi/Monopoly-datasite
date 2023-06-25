import { PrismaClient } from "@prisma/client";
import { z } from 'zod'
import express from "express";
import ViteExpress from "vite-express";
import { init } from './dbInit'
import { CardCache, ColorCache, IDCache, PropertyCache, RailroadCache, SpotCache, UtilityCache } from "./cache";
import { card, Colors } from "../lib/schema";

const app = express();
const prisma = new PrismaClient({
  log: [
    { level: 'info', emit: 'event' },
    { level: 'warn', emit: 'event' },
    { level: 'error', emit: 'event' },
  ],
})

prisma.$on('warn', e => console.log(e))
prisma.$on('error', e => console.log(e))
prisma.$on('info', e => console.log(e))

// INFO: Creates all the Database boilerplate

// init(prisma)

// NOTE: '/api/property', '/api/railroad', and '/api/utility' are duplicated
// due to restrictions around primsa typing, the ideal would be to use '/api/:spot'
app.get("/api/property", async (req, res) => {
  try {
    const propName = req.query.name
    const propNameValid = z.string().parse(propName)

    let out = PropertyCache.get(propNameValid)
    let data
    if (!out) {
      data = await prisma.property.findFirst({
        where: {
          name: { contains: propNameValid }
        }
      })
    } else {
      data = out
    }
    if (data == null) throw "Null Property";
    res.status(200).json(data)
  } catch {
    res.status(500).json(null)
  }
});

app.get("/api/railroad", async (req, res) => {
  try {
    const propName = req.query.name
    const propNameValid = z.string().parse(propName)

    let out = RailroadCache.get(propNameValid)
    let data
    if (!out) {
      data = await prisma.railroad.findFirst({
        where: {
          name: { contains: propNameValid }
        }
      })

      if (data) RailroadCache.set(propNameValid, data)
    } else {
      data = out
    }
    if (data == null) throw "Null Property";
    res.status(200).json(data)
  } catch {
    res.status(500).json(null)
  }
});
app.get("/api/utility", async (req, res) => {
  try {
    const propName = req.query.name
    const propNameValid = z.string().parse(propName)

    let out = UtilityCache.get(propNameValid)
    let data
    if (!out) {
      data = await prisma.utilities.findFirst({
        where: {
          name: { contains: propNameValid }
        }
      })
      if (data) UtilityCache.set(propNameValid, data)
    } else {
      data = out
    }
    if (data == null) throw "Null Property";
    res.status(200).json(data)
  } catch {
    res.status(500).json(null)
  }
});

app.get("/api/color/:color", async (req, res) => {
  try {
    const colorUnsafe = req.params.color
    const color = Colors.parse(colorUnsafe)

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
    if (data == null) throw "Null Property"
    res.status(200).json(data)
  } catch {
    res.status(500).json(null)
  }
})

app.get("/api/spot/:id", async (req, res) => {
  try {
    const idUnsafe = req.params.id
    const id = z.coerce.number().lt(40).gte(0).parse(idUnsafe)

    const out = IDCache.get(id)
    let data
    if (!out) {
      if ([0, 4, 10, 20, 30, 38].includes(id)) {
        data = await prisma.special.findUnique({
          where: {
            id: id,
          }
        })
      } else if ([12, 28].includes(id)) {
        data = await prisma.utilities.findUnique({
          where: {
            id: id,
          }
        })
      } else if ([5, 15, 25, 35].includes(id)) {
        data = await prisma.railroad.findUnique({
          where: {
            id: id,
          }
        })
      } else if ([2, 7, 17, 22, 33, 36].includes(id)) {
        data = await prisma.drawable.findUnique({
          where: {
            id: id,
          }
        })
      } else {
        data = await prisma.property.findUnique({
          where: {
            id: id,
          }
        })
      }

      if (data) IDCache.set(id, data)
    } else {
      data = out
    }
    if (!data) {
      res.status(500).json(null)
      return
    }
    res.status(200).json(data)
  } catch (err) {
    res.status(500).json(null)
  }
})

app.get('/api/spots', async (req, res) => {
  try {
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
  } catch (err) {
    res.status(500).json(null)
  }
})

app.get('/api/cards', async (req, res) => {
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
      res.status(200).json(card)
    }
  } catch {
    res.status(500).json(null)
  }
})

app.get('/api/card/:id', async (req, res) => {
  try {
    let card
    const id = z.number().gte(0).lt(34).parse(req.params.id)
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

type Housable = {
  name: string
  houses?: number
}

app.get('/api/names', async (req, res) => {
  try {
    const properties: Housable[] = await prisma.property.findMany({ select: { name: true } })
    properties.forEach((_, i, obj) => {
      obj[i]['houses'] = 0
      // ...
    })
    const railroads = await prisma.railroad.findMany({ select: { name: true } })
    const utilities = await prisma.utilities.findMany({ select: { name: true } })
    res.status(200).json([...properties, ...railroads, ...utilities])
  } catch {
    res.status(500).json(null)
  }
})

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000...")
);

