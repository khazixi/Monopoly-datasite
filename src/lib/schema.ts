import { z } from 'zod'


export const Colors = z.enum([
  'BROWN', 'LIGHTBLUE',
  'PINK', 'ORANGE',
  'RED', 'YELLOW',
  'GREEN', 'BLUE'
])

type Color = z.infer<typeof Colors>

type Spot = z.infer<typeof SpotSchema>

export const CardType = z.enum([
  'CHANCE',
  'COMMUNITYCHEST'
])

export const PropertySchema = z.object({
  id: z.number().lt(40).gte(0),
  name: z.string(),
  color: Colors,
  price: z.number(),
  rent: z.number().array().length(7),
}).required()

export const UtilitySchema = z.object({
  id: z.number().gte(0).lt(40),
  name: z.string(),
  price: z.number(),
  rent: z.number().array().length(2)
}).required()

export const RailroadSchema = z.object({
  id: z.number().gte(0).lt(40),
  name: z.string(),
  price: z.number(),
  rent: z.number().array().length(4)
}).required()

export const SpecialSchema = z.object({
  id: z.number().gte(0).lt(40),
  name: z.string(),
  description: z.string()
})

export const DrawableSchema = z.object({
  id: z.number().gte(0).lt(40),
  type: CardType
})

export const card = z.object({
  id: z.number().gte(0).lt(34),
  type: CardType,
  description: z.string()
})

export const SpotSchema = z.union([
  PropertySchema,
  RailroadSchema,
  DrawableSchema,
  UtilitySchema,
  SpecialSchema,
])

