import express from "express";
import ViteExpress from "vite-express";
import apiRouter from "./routes/api";
import authRouter from "./routes/auth";

const app = express();

app.use(express.json())
app.use(express.urlencoded())
app.use(apiRouter, authRouter)
ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000...")
);

