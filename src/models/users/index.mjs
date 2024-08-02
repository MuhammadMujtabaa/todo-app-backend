import { model, Schema } from "mongoose";

const schema = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
    },
    avatar: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

export const UserModel = model("User", schema);
