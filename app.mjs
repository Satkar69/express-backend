import express from "express";
import appRouter from "./routes/appRouter.mjs";
import { requestMiddleware } from "./utils/middleware.mjs";

const app = express();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});

app.use(requestMiddleware);

// body parser for request body
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use(appRouter);
