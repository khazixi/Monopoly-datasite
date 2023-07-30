import { lucia } from 'lucia'
import { express } from 'lucia/middleware'
import { prisma } from '@lucia-auth/adapter-prisma'
import client from "./dbclient"


export const auth = lucia({
  env: 'DEV',
  middleware: express(),
  adapter: prisma(client),
  getUserAttributes: (data) => {
    return {
      username: data.username,
    }
  },
})

export type Auth = typeof auth
