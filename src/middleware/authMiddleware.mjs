import { UserModel } from "../models/users/index.mjs";
import { verifyToken } from "../utils/jwt.mjs";

export const authMiddleware = async (req, res, next) => {
  try {
    const header = req.headers?.authorization;

    if (header?.startsWith("Bearer ")) {
      const token = header.split(" ")[1];
      const data = verifyToken(token);

      if (data) {
        const user = await UserModel.findById(data.id).select("-password");

        if (user) {
          req.user = user;
          return next();
        }
      }
    }

    res.status(401).json({
      message: "Unauthorized",
      status: "error",
      statusCode: 401,
      error: "User unauthorized",
    });
  } catch (error) {
    console.error("Authorization error:", error);
    res.status(500).json({
      message: "Internal server error",
      status: "error",
      statusCode: 500,
      error: "Internal server error",
    });
  }
};
