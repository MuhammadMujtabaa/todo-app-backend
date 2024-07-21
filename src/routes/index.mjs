import { Router } from "express";
import { authRouter } from "./auth/index.mjs";
import { userRouter } from "./users/index.mjs"


export const router = Router();

router.use("/user", authRouter);
router.use("/user", userRouter)
