import { Router } from "express";
import { checkSchema } from "express-validator";
import { userForgetPasswordValidationSchema, userResetPasswordValidationSchema, userSignInValidationSchema, userSignupValidationSchema } from "../../utils/validationSchemas.mjs";
import { forgetPassword, myProfile, resetPassword, userSignIn, userSignup } from "../../controllers/auth/index.mjs";
import { authMiddleware } from "../../middleware/authMiddleware.mjs";

export const authRouter = Router();

authRouter.post("/auth/signup", checkSchema(userSignupValidationSchema), userSignup);
authRouter.post("/auth/signin", checkSchema(userSignInValidationSchema), userSignIn);

authRouter.post("/auth/forget_password",checkSchema(userForgetPasswordValidationSchema), forgetPassword)
authRouter.post("/auth/reset_password",checkSchema(userResetPasswordValidationSchema), resetPassword)

authRouter.get("/my_profile", authMiddleware, myProfile)