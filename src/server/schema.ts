import { z } from 'zod'

export const buyableNameSchema = z.string().length(48)

export const idSchema = z.number().gte(0).lte(40)

export const userCreationSchema = z.object({
  username: z.string().min(8).max(32),
  password: z.string().min(8).max(64)
})

export const gameSchema = z.object({
  name: z.string(),
  username: z.string(),
  players: z.object({
    name: z.string(),
    owned: z.object({
      name: z.string(),
      houses: z.number().optional(),
    }).array()
  }).array(),
})

export const colorSchema = z.enum([
  'BROWN', 'LIGHTBLUE',
  'PINK', 'ORANGE',
  'RED', 'YELLOW',
  'GREEN', 'BLUE'
])

export const cardType = z.enum([
  'CHANCE',
  'COMMUNITYCHEST'
])

export const cardIDScheama = z.number().gte(0).lt(34)

export const propertySchema = z.object({
  id: z.number().lt(40).gte(0),
  name: buyableNameSchema,
  color: colorSchema,
  price: z.number(),
  rent: z.number().array().length(7),
}).required()

export const utilitySchema = z.object({
  id: z.number().gte(0).lt(40),
  name: buyableNameSchema,
  price: z.number(),
  rent: z.number().array().length(2)
}).required()

export const railroadSchema = z.object({
  id: z.number().gte(0).lt(40),
  name: buyableNameSchema,
  price: z.number(),
  rent: z.number().array().length(4)
}).required()

export const specialSchema = z.object({
  id: z.number().gte(0).lt(40),
  name: buyableNameSchema,
  description: z.string()
})

export const drawableSchema = z.object({
  id: z.number().gte(0).lt(40),
  type: cardType
})

export const card = z.object({
  id: z.number().gte(0).lt(34),
  type: cardType,
  description: z.string()
})

export const SpotSchema = z.union([
  propertySchema,
  railroadSchema,
  drawableSchema,
  utilitySchema,
  specialSchema,
])

