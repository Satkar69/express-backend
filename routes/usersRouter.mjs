import { Router } from "express";
import { getUsers, createUser } from "../controllers/userControllers.mjs";

const router = Router();

// route to read the users
router.get("/", getUsers);

// route to create user
router.post("/register", createUser);

export default router;
