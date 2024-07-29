import { Router } from "express";

export const todoRouter = Router();

todoRouter.route("/todo").post();
