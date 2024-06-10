import { Router } from "express";

const router = Router();

router.get("/products", (req, res) => {
  res.send("Hello this is products route");
});

export default router;
