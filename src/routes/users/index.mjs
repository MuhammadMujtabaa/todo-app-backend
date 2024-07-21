import { Router } from "express";
import { deleteUserById, getAllUsers, getUserById } from "../../controllers/users/index.mjs";

export const userRouter = Router();

userRouter.get("/", getAllUsers)
userRouter.route("/:id")
    .get(getUserById)
    .delete(deleteUserById)