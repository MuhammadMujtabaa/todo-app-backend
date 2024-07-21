import { Router } from "express";
import { checkSchema } from "express-validator";
import { userSignInValidationSchema, userSignupValidationSchema } from "../../utils/validationSchemas.mjs";
import { userSignIn, userSignup } from "../../controllers/auth/index.mjs";

export const authRouter = Router();

authRouter.post("/auth/signup", checkSchema(userSignupValidationSchema), userSignup);
authRouter.post("/auth/signin", checkSchema(userSignInValidationSchema), userSignIn);
