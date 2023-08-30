import 'dotenv/config'
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import { migrationClient } from "../server/util/db";

migrate(
  drizzle(migrationClient),
  { migrationsFolder: 'migrations' }
)
  .catch(e => console.log(e))
  .then(() => migrationClient.end())

