import { PrismaClient } from "@prisma/client";
import { z } from 'zod'
import express from "express";
import ViteExpress from "vite-express";
import { init } from './dbInit'

const app = express();
const prisma = new PrismaClient()


init(prisma) // INFO: Creates all the Database boilerplate

// NOTE: '/api/property', '/api/railroad', and '/api/utility' are duplicated
// due to restrictions around primsa typing, the ideal would be to use '/api/:spot'
app.get("/api/property", async (req, res) => {
  try {
    const propName = req.query.name
    const propNameValid = z.string().parse(propName)
    const property = await prisma.property.findFirst({
      where: {
        name: { contains: propNameValid }
      }
    })
    if (property == null) throw "Null Property";
    res.json({ status: 200, data: property })
  } catch {
    res.status(500).json({ status: 500, data: 'Internal Server Error' })
  }
});

app.get("/api/railroad", async (req, res) => {
  try {
    const propName = req.query.name
    const propNameValid = z.string().parse(propName)
    const railroad = await prisma.railroad.findFirst({
      where: {
        name: { contains: propNameValid }
      }
    })
    if (railroad == null) throw "Null Property";
    res.json({ status: 200, data: railroad })
  } catch {
    res.status(500).json({ status: 500, data: 'Internal Server Error' })
  }
});

app.get("/api/utility", async (req, res) => {
  try {
    const propName = req.query.name
    const propNameValid = z.string().parse(propName)
    const utilities = await prisma.utilities.findFirst({
      where: {
        name: { contains: propNameValid }
      }
    })
    if (utilities == null) throw "Null Property";
    res.json({ status: 200, data: utilities })
  } catch {
    res.status(500).json({ status: 500, data: 'Internal Server Error' })
  }
});

app.get("/api/color/:color", async (req, res) => {
  try {
    const colorUnsafe = req.params.color
    const colorSchema = z.enum(["BROWN", "LIGHTBLUE", "PINK", "ORANGE", "RED", "YELLOW", "GREEN", "BLUE"])
    const color = colorSchema.parse(colorUnsafe)
    const data = await prisma.property.findMany({
      where: {
        color
      }
    })
    if (data == null) throw "Null Property"
    res.json({ status: 200, data: data })
  } catch {
    res.status(500).json({ status: 500, data: 'Internal Server Error' })
  }
})

app.get("/api/spot/:id", async (req, res) => {
  try {
    const idUnsafe = req.params.id
    const id = z.coerce.number().parse(idUnsafe)
    let data
    if ([0, 4, 10, 20, 30].includes(id)) {
      data = await prisma.special.findFirst({
        where: {
          id
        }
      })
    } else if ([12, 28].includes(id)) {
      data = await prisma.utilities.findFirst({
        where: {
          id
        }
      })
    } else if ([5, 15, 25, 35].includes(id)) {
      data = await prisma.railroad.findFirst({
        where: {
          id
        }
      })
    } else if ([2, 7, 17, 22, 33, 36].includes(id)) {
      data = await prisma.drawable.findFirst({
        where: {
          id
        }
      })
    } else {
      data = await prisma.property.findFirst({
        where: {
          id
        }
      })
    }

    if (!data) {
      res.status(500).json({ status: 500, data: 'Internal Server Error' })
      return
    }
    res.json({ status: 200, data: data })
  } catch (err) {
    res.status(500).json({ status: 500, data: err })
  }
})

app.get('/api/spots', async (req, res) => {
  try {
    const properties = await prisma.property.findMany()
    const railroads = await prisma.railroad.findMany()
    const utilities = await prisma.utilities.findMany()
    const special = await prisma.special.findMany()
    const drawables = await prisma.special.findMany()

    const spots = [...properties, ...railroads, ...utilities, ...special, ...drawables]
      .sort((a, b) => {
        if (a.id > b.id) return 1
        if (b.id > a.id) return -1
        return 0
      })
    res.json({ status: 200, data: spots })
  } catch (err) {
    res.status(500).json({ status: 500, data: err })
  }
})

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000...")
);
