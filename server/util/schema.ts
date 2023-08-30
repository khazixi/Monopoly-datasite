import { pgEnum, pgTable, serial, text, integer, bigint } from "drizzle-orm/pg-core";

export const colorsEnum = pgEnum('Color', [
  "BROWN",
  "LIGHTBLUE",
  "PINK",
  "ORANGE",
  "RED",
  "YELLOW",
  "GREEN",
  "BLUE",
])

export const cardsEnum = pgEnum('Cardtype', [
  "CHANCE",
  "COMMUNITYCHEST",
])

export const property = pgTable('Property', {
  id: serial('id').unique().notNull(),
  name: text('name').unique().notNull(),
  price: integer('price').notNull(),
  rent: integer('rent').array().notNull(),
  color: colorsEnum('color'),
})

export const houses = pgTable('Houses', {
  color: colorsEnum('color').notNull(),
  price: integer('price').notNull(),
})

export const special = pgTable('Special', {
  id: serial('id').unique().notNull(),
  name: text('name').unique().notNull(),
  description: text('description').notNull(),
})

export const drawable = pgTable('Drawable', {
  id: serial('id').unique().notNull(),
  type: cardsEnum('type').notNull(),
})

export const card = pgTable('Card', {
  id: serial('id').primaryKey(),
  type: cardsEnum('type').notNull(),
  description: text('description').unique().notNull(),
})

export const game = pgTable('Game', {
  id: serial('id').primaryKey(), data: json('data').notNull(),
  username: text('string').notNull(),
}, (table) => ({
  username_idx: index('username_idx').on(table.username)
}))

export const user = pgTable('User', {
  id: serial('id').primaryKey(),
  username: text('string').notNull(),
})

export const session = pgTable('Session', {
  id: serial('id').primaryKey(),
  user_id: text('user_id').notNull().references(() => user.id),
  active_expires: bigint('active_expires').notNull(),
  idle_expires: bigint('idle_expires').notNull(),
}, (table) => ({
  user_id_idx: index('user_id_idx').on(table.user_id)
}))

export const key = pgTable('Key', {
  id: text('id').primaryKey(),
  hashed_password: text('hashed_password'),
  user_id: text('user_id').references(() => user.id)
}, (table) => ({
  user_id_idx: index('user_id_idx').on(table.user_id)
}))

