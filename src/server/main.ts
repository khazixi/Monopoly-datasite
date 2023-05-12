import express from "express";
import ViteExpress from "vite-express";
import PrismaClient from '@prisma/client'

const app = express();
const prisma = new PrismaClient()

app.get("/hello", (_, res) => {
  res.send("Hello Vite + Vue + TypeScript!");
});

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000...")
);
