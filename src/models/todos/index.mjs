import { model, Schema } from "mongoose";

const todo = new Schema(
  {
    user: {
      type: Schema.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    dateAndTime: {
      type: Date,
    },
  },
  { timestamps: true }
);

export const todoModel = model("Todo", todo);
