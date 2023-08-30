// import { db } from "../server/util/db"
import dotenv from 'dotenv'
import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"
import { key, session, user } from "../server/util/schema"

dotenv.config()
console.log(process.env)


export const queryClient = postgres(process.env.DATABASE_URL! ,{ ssl: 'require' })
export const db = drizzle(queryClient, { logger: true })

db.transaction(async tx => {
  await tx.delete(key)
  await tx.delete(session)
  await tx.delete(user)
})
  .then(() => console.log('Successfully Cleared All User Data'))
  .catch(e => console.log(e))
  .catch(() => console.log('Failed to Clear All User Data'))
