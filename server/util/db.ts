import postgres from 'postgres'
import { drizzle } from 'drizzle-orm/postgres-js'
import { card, game, property, special, drawable } from "./schema";
import type { Game, GameRoute } from "./cleaning";
import { and, eq } from "drizzle-orm";

export const queryClient = postgres(process.env.DATABASE_URL! ,{ ssl: 'require' })
export const migrationClient = postgres(process.env.DATABASE_URL!, { max: 1, ssl: 'require' })
export const db = drizzle(queryClient, { logger: true })


// NOTE: I'll just put queries here
export async function getCards() {
  return db
    .select()
    .from(card)
}

export async function saveGame(username: string, g: Game) {
  return db
    .insert(game)
    .values({ username: username, data: g })
    .returning({id: game.id})
}

export async function updateGame(username: string, r: GameRoute) {
  return db
    .update(game)
    .set({ data: r.data })
    .where(
      and(
        eq(game.username, username),
        eq(game.id, r.id)
      )
    )
}

export async function getGame(username: string, id: number) {
  return db
    .select()
    .from(game)
    .where(
      and(
        eq(game.id, id),
        eq(game.username, username)
      )
    )
    .limit(1)
}

export async function getGames(username: string) {
  return db
    .select()
    .from(game)
    .where(
      eq(game.username, username)
    )
}

export async function deleteGame(username: string, id: number) {
  return db
    .delete(game)
    .where(
      and(
        eq(game.id, id),
        eq(game.username, username)
      )
    )
}

export async function getSpots() {
  // return db
  //   .select()
  //   .from(property)
  //   .leftJoin(special, eq(special.id, property.id))
  //   .leftJoin(drawable, eq(drawable.id, property.id))
  //

  // PERF: I think this has the same perf as a join
  return db.transaction(async tx => {
    const props = await tx.select().from(property)
    const spec = await tx.select().from(special)
    const draw = await tx.select().from(drawable)

    return [
      ...props,
      ...spec,
      ...draw
    ]
  })
}
