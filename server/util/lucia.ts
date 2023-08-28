import { prisma } from "@lucia-auth/adapter-prisma";
import { lucia } from "lucia";
import { h3 } from "lucia/middleware";
import { prisma as db } from "./db";
import "lucia/polyfill/node"

export const auth = lucia({
  adapter: prisma(db),
  env: "DEV",
  // env: process.dev ? "DEV" : "PROD",
  middleware: h3(),
  csrfProtection: true,

  getUserAttributes: (data) => {
    return { username: data.username };
  },
});

export type Auth = typeof auth;
