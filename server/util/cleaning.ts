import { z } from 'zod'

export const gameSchema = z.object({
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

export const gameRoute = z.object({
  id: z.number(),
  data: gameSchema,
})

export type Game = z.infer<typeof gameSchema>
export type GameRoute = z.infer<typeof gameRoute>
