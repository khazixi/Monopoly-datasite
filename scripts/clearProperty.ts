import 'dotenv/config'
import { card, drawable, houses, property, special } from "../server/util/schema"
import { db } from "../server/util/db"

db.transaction(async tx => {
  await tx.delete(property)
  await tx.delete(houses)
  await tx.delete(special)
  await tx.delete(drawable)
  await tx.delete(card)
})
  .catch(e => console.log(e))
  .then(() => console.log('Successfully Deleted Properties'))
  .catch(() => console.log('Failed to Delete Properties'))

