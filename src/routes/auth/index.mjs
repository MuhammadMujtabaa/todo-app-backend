import { Router } from "express";
import { checkSchema } from "express-validator";
import {
  forgetPassword,
  resetPassword,
  userSignIn,
  userSignup
} from "../../controllers/auth/index.mjs";
import {
  userForgetPasswordValidationSchema,
  userResetPasswordValidationSchema,
  userSignInValidationSchema,
  userSignupValidationSchema
} from "../../utils/validationSchemas.mjs";

export const authRouter = Router();

// User registration route
authRouter.post("/signup", checkSchema(userSignupValidationSchema), userSignup);

// User login route
authRouter.post("/signin", checkSchema(userSignInValidationSchema), userSignIn);

// Forgot password route
authRouter.post("/forget_password", checkSchema(userForgetPasswordValidationSchema), forgetPassword);

// Reset password route
authRouter.post("/reset_password", checkSchema(userResetPasswordValidationSchema), resetPassword);

