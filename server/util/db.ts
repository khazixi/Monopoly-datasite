import { PrismaClient } from "@prisma/client";

import postgres from 'postgres'
import { drizzle } from 'drizzle-orm/postgres-js'
import { migrate } from 'drizzle-orm/postgres-js/migrator'
import { card, game, property, special, drawable } from "./schema";
import { Game, GameRoute } from "./cleaning";
import { and, eq, ne } from "drizzle-orm";
import { PgColumn } from "drizzle-orm/pg-core";

export const prisma = new PrismaClient();

export const queryClient = postgres(process.env.DATABASE_URL!)
export const db = drizzle(queryClient)

const migrationClient = postgres(process.env.DATABASE_URL!, { max: 1 })
await migrate(drizzle(migrationClient), { migrationsFolder: 'drizzle' })

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
  return db
    .select()
    .from(property)
    .fullJoin(special, ne(special.id, property.id))
    .fullJoin(drawable, ne(drawable.id, property.id))
}

