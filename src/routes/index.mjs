import { Router } from "express";
import { authRouter } from "./auth/index.mjs";
import { userRouter } from "./users/index.mjs";
import { todoRouter } from "./todo/index.mjs";

export const router = Router();

// Use auth router for authentication-related routes
router.use("/auth", authRouter);

// Use user router for user-related routes
router.use("/user", userRouter);
router.use("/todo",todoRouter)
// Handle unknown routes
router.use((req, res, next) => {
  res.status(404).json({ error: "Route Not Found!" });
});
