import { UserModel } from "../models/users/index.mjs";
import { verifyToken } from "../utils/jwt.mjs";

export const authMiddleware = async (req, res, next) => {
  
  const header = req?.headers?.authorization;
  
  if (header && header?.startsWith("Bearer")) {

    const data = verifyToken(header?.split(" ")[1])

    const user = await UserModel.findById(data?.id).select("-password")
    if (user) {
      req.user = user
      next();
    } else {
      res.send({
        message: "unauthorized!",
        status: "error",
        statusCode: 401,
        error: "user unauthorized!"
      });
    }
  } else {
    res.send({
      message: "unauthorized!",
      status: "error",
      statusCode: 401,
      error: "user unauthorized!"
    });
  }

};
