import { db } from "../db"
import { game } from "../schema"

await db.delete(game)
  .then(() => console.log('Successfully Deleted Games'))
  .catch(() => console.log('Successfully Deleted Games'))
