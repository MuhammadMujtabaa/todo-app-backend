import { Router } from "express";
import { deleteUserById, getAllUsers, getUserById } from "../../controllers/users/index.mjs";

export const userRouter = Router();

// Route to get all users
userRouter.get("/", getAllUsers);

// Routes to get a user by ID and delete a user by ID
userRouter.route("/:id")
  .get(getUserById)    // Get user by ID
  .delete(deleteUserById); // Delete user by ID
