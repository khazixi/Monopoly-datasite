import { postgres } from "@lucia-auth/adapter-postgresql";
import { lucia } from "lucia";
import { h3 } from "lucia/middleware";
import { queryClient } from "./db";
import "lucia/polyfill/node"

export const auth = lucia({
  adapter: postgres(queryClient, {
    user: 'User',
    session: 'Session',
    key: 'Key'
  }),
  env: process.dev ? "DEV" : "PROD",
  middleware: h3(),
  csrfProtection: true,

  getUserAttributes: (data) => {
    return { username: data.username };
  },
});

export type Auth = typeof auth;
