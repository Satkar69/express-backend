import { Router } from "express";
import {
  getUsers,
  createUser,
  login,
} from "../controllers/userControllers.mjs";

const router = Router();

// route to read the users
router.get("/", getUsers);

// route to create user
router.post("/register", createUser);

// route to login
router.post("/login", login);

export default router;
