import { Router } from "express";
import { addTodo, deleteTodoById, getTodo, getTodoById } from "../../controllers/todo/index.mjs";
import { authMiddleware } from "../../middleware/authMiddleware.mjs";
import { checkSchema } from "express-validator";
import { addTodoValidationSchema } from "../../utils/validationSchemas.mjs";

export const todoRouter = Router();

todoRouter
  .route("/")
  .post(authMiddleware, checkSchema(addTodoValidationSchema), addTodo)
  .get(authMiddleware, getTodo);


  todoRouter
  .route("/:id")
  .get(authMiddleware, getTodoById)
  .delete(authMiddleware, deleteTodoById)
