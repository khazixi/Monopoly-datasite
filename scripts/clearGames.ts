import 'dotenv/config'
import { db } from "../server/util/db"
import { game } from "../server/util/schema"

db.delete(game)
  .then(() => console.log('Successfully Deleted Games'))
  .catch(() => console.log('Failed to Delete Games'))
