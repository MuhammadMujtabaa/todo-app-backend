import jwt from "jsonwebtoken";

// Generate a JWT token with the provided user ID
export const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "3d" });
};

// Verify the provided JWT token and return the decoded payload
export const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    console.error("Token verification error:", error);
    return null;
  }
};
