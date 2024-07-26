import { matchedData, validationResult } from "express-validator";
import { UserModel } from "../../models/users/index.mjs";
import { comparePassword, hashPassword } from "../../utils/hash.mjs";
import { generateToken } from "../../utils/jwt.mjs";

export const userSignup = async (req, res) => {
  try {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      res
        .status(422)
        .send({ message: "validation failed!", error: result.array() });
    }
    const data = matchedData(req);
    data.password = hashPassword(data?.password);

    const newUser = new UserModel(data);
    await newUser.save();

    res.send({ message: "signup successful", data: newUser });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes

    if (error.name === "ValidationError") {
      // Handle Mongoose validation error
      const errors = Object.values(error.errors).map((err) => err.message);
      res.status(400).send({ message: "Validation Error", error: errors });
    } else if (error.code === 11000) {
      // Handle unique constraint error for email
      res
        .status(409)
        .send({ message: "duplicate Error", error: "email already exists!" });
    } else {
      res.status(500).send({ message: "internal server error!" });
    }
  }
};

export const userSignIn = async (req, res) => {
  try {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      res
        .status(422)
        .send({ message: "validation failed!", error: result.array() });
    }

    const data = matchedData(req);
    const findUser = await UserModel.findOne({ email: data.email });

    if (findUser) {
      const comparePasswordResult = comparePassword(
        data?.password,
        findUser?.password
      );
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
        });
      }
    } else {
      res.status(401).send({
        status: "error",
        statusCode: 401,
        message: "incorrect email or password!",
      });
    }
  } catch (error) {
    res.status(500).send({ message: "internal server error!" });
  }
};

export const myProfile = (req, res) => {
  res.send({ message: "profile" });
};
