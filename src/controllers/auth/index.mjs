import { matchedData, validationResult } from "express-validator";
import { UserModel } from "../../models/users/index.mjs";
import { comparePassword, hashPassword } from "../../utils/hash.mjs";
import { generateOTPCode } from "../../utils/generateOTPCode.mjs";
import { generateToken } from "../../utils/jwt.mjs";
import { tokenModel } from "../../models/token/index.mjs";
import { sendEmail } from "../../utils/sendEmail.mjs";

export const userSignup = async (req, res) => {
  try {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      res.status(422).send({ message: "validation failed!", error: result.array() });
    } else {
      const data = matchedData(req);
      data.password = hashPassword(data?.password);

      const newUser = new UserModel(data);
      await newUser.save();

      res.send({ message: "signup successful", data: newUser });
    }
  } catch (error) {
    console.error(error); // Log the error for debugging purposes

    if (error.name === "ValidationError") {
      // Handle Mongoose validation error
      const errors = Object.values(error.errors).map((err) => err.message);
      res.status(400).send({ message: "Validation Error", error: errors });
    } else if (error.code === 11000) {
      // Handle unique constraint error for email
      res.status(409).send({ message: "duplicate Error", error: "email already exists!" });
    } else {
      res.status(500).send({ message: "internal server error!" });
    }
  }
};

export const userSignIn = async (req, res) => {
  try {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      res.status(422).send({ message: "validation failed!", error: result.array() });
    }

    const data = matchedData(req);
    const findUser = await UserModel.findOne({ email: data.email });

    if (findUser) {
      const comparePasswordResult = comparePassword(data?.password, findUser?.password);
      if (comparePasswordResult) {
        res.send({
          message: "sign in successful",
          data: { ...findUser.toJSON(), _token: generateToken(findUser?.id) },
        });
      } else {
        res.status(401).send({
          status: "error",
          statusCode: 401,
          message: "incorrect email or password!",
          error: "incorrect email or password!",
        });
      }
    } else {
      res.status(401).send({
        status: "error",
        statusCode: 401,
        message: "incorrect email or password!",
        email: "incorrect email or password!",
      });
    }
  } catch (error) {
    res.status(500).send({ message: "internal server error!" });
  }
};

export const forgetPassword = async (req, res) => {
  try {
    const result = validationResult(req);
    if (!result?.isEmpty()) {
      res.status(422).send({ message: "validation failed!", error: result.array() });
    } else {
      const data = matchedData(req);
      const user = await UserModel.findOne({ email: data?.email });
      if (user) {
        const tokenData = {
          userId: user?._id,
          token: generateOTPCode(),
          email: data?.email,
        };

        const token = new tokenModel(tokenData);
        // console.log(token?.token)
        await token.save();

        await sendEmail(user.email, "Password reset", `your otp code is: ${token?.token}`);

        res.send({
          message: "password reset code sent to your email account",
          data: null,
        });
      } else {
        res.status(404).send({
          status: "error",
          message: "email not found!",
          error: "email not found!",
        });
      }
      console.log("user", user);
    }
  } catch (error) {
    console.log("error", error);
    res.status(500).send({
      status: "error",
      message: "network error!",
      error: "network error!",
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const result = validationResult(req);
    if (!result?.isEmpty()) {
      res.status(422).send({ message: "validation failed!", error: result.array() });
    } else {
      const data = matchedData(req);
      const checkTokenAndEmail = await tokenModel.findOne({
        email: data?.email,
        token: data?.token,
      });

      if (checkTokenAndEmail) {
        const response = await UserModel.findByIdAndUpdate(
          {
            _id: checkTokenAndEmail?.userId,
          },
          { password: hashPassword(data?.password) },
        );
        if (response) {
          console.log("checkTokenAndEmail", checkTokenAndEmail?._id);
          const deleteResult = await tokenModel.findByIdAndDelete(checkTokenAndEmail?._id);
          console.log("deleteResult", deleteResult);
        }
        res.send({
          message: "password reset successfully.",
          data: null,
        });
      } else {
        res.status(400).send({
          status: "error",
          message: "invalid code or expired!",
          error: "invalid code or expired!",
        });
      }
      // console.log("data",data)
    }
  } catch (error) {
    console.log("error", error);
    res.status(500).send({
      status: "error",
      message: "network error!",
      error: "network error!",
    });
  }
};

export const myProfile = (req, res) => {
  res.send({ message: "profile", data: req?.user });
};
