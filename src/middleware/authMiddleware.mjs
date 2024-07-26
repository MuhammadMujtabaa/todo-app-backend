import { verifyToken } from "../utils/jwt.mjs";

export const authMiddleware = (req, res, next) => {
  console.log("req", req?.headers?.authorization);
  const header = req?.headers?.authorization;
  if(header && header?.startsWith("Bearer")) {
    console.log("token => ", header?.split(" ")[1]);
    const user = verifyToken(header?.split(" ")[1])
    console.log("user",user)
    
  }
  next();
};
