import { Router } from "express";
import usersRouter from "./usersRouter.mjs";
import productsRouter from "./productsRouter.mjs";

const router = Router();

router.use("/api/users", usersRouter);
router.use("/api/products", productsRouter);

export default router;
