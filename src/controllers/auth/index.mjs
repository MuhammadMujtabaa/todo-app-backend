import { matchedData, validationResult } from "express-validator";
import { UserModel } from "../../models/users/index.mjs";
import { comparePassword, hashPassword } from "../../utils/hash.mjs";
import { generateOTPCode } from "../../utils/generateOTPCode.mjs";
import { generateToken } from "../../utils/jwt.mjs";
import { tokenModel } from "../../models/token/index.mjs";
import { sendEmail } from "../../utils/sendEmail.mjs";

export const userSignup = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ message: "Validation failed!", errors: errors.array() });
    }

    const data = matchedData(req);
    data.password = hashPassword(data.password);

    const newUser = new UserModel(data);
    await newUser.save();

    res.json({ message: "Signup successful", data: newUser });
  } catch (error) {
    console.error("Signup error:", error);

    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map(err => err.message);
      res.status(400).json({ message: "Validation Error", errors });
    } else if (error.code === 11000) {
      res.status(409).json({ message: "Duplicate Error", error: "Email already exists!" });
    } else {
      res.status(500).json({ message: "Internal server error!" });
    }
  }
};

export const userSignIn = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ message: "Validation failed!", errors: errors.array() });
    }

    const data = matchedData(req);
    const user = await UserModel.findOne({ email: data.email });

    if (user && comparePassword(data.password, user.password)) {
      res.json({
        message: "Sign in successful",
        data: { ...user.toJSON(), _token: generateToken(user.id) },
      });
    } else {
      res.status(401).json({
        status: "error",
        message: "Incorrect email or password!",
      });
    }
  } catch (error) {
    console.error("Sign-in error:", error);
    res.status(500).json({ message: "Internal server error!" });
  }
};

export const forgetPassword = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ message: "Validation failed!", errors: errors.array() });
    }

    const data = matchedData(req);
    const user = await UserModel.findOne({ email: data.email });
    if (!user) {
      return res.status(404).json({ status: "error", message: "Email not found!" });
    }

    const tokenData = {
      userId: user._id,
      token: generateOTPCode(),
      email: data.email,
    };

    const token = new tokenModel(tokenData);
    await token.save();
    await sendEmail(user.email, "Password reset", `Your OTP code is: ${token.token}`);

    res.json({ message: "Password reset code sent to your email account" });
  } catch (error) {
    console.error("Forget password error:", error);
    res.status(500).json({ status: "error", message: "Network error!" });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ message: "Validation failed!", errors: errors.array() });
    }

    const data = matchedData(req);
    const tokenEntry = await tokenModel.findOne({ email: data.email, token: data.token });
    if (!tokenEntry) {
      return res.status(400).json({ status: "error", message: "Invalid code or expired!" });
    }

    await UserModel.findByIdAndUpdate(tokenEntry.userId, { password: hashPassword(data.password) });
    await tokenModel.findByIdAndDelete(tokenEntry._id);

    res.json({ message: "Password reset successfully." });
  } catch (error) {
    console.error("Reset password error:", error);
    res.status(500).json({ status: "error", message: "Network error!" });
  }
};

export const myProfile = (req, res) => {
  res.json({ message: "Profile", data: req.user });
};
