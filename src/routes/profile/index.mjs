import { Router } from "express";
import { authMiddleware } from "../../middleware/authMiddleware.mjs";
import { getProfile, updateProfile } from "../../controllers/profile/index.mjs";
import { checkSchema } from "express-validator";
import { updateProfileValidationSchema } from "../../utils/validationSchemas.mjs";
import { upload } from "../../middleware/multer.mjs";

export const profileRouter = Router();

// User profile route (protected)
profileRouter.get("/", authMiddleware, getProfile)
profileRouter.patch("/", authMiddleware,upload.single("avatar"), checkSchema(updateProfileValidationSchema),updateProfile);
