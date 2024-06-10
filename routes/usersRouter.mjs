import { Router } from "express";

const router = Router();

router.get("/users", (req, res) => {
  res.send("Hello this is users route");
});

export default router;
